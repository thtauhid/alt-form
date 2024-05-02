import db from "@/utils/db";
import { GROQ_API_KEY } from "@/constants";
import { Request, Response } from "express";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

const tools = [
  {
    type: "function",
    function: {
      name: "create_new_form",
      description: "Get form details from text and create new form",
      parameters: {
        type: "object",
        properties: {
          form_title: {
            type: "string",
            description: "Title of the form",
          },
          form_description: {
            type: "string",
            description: "Description of the form. Make it a bit longer.",
          },
        },
        required: ["form_title", "form_description"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "add_form_field",
      description: "Adds fields to the form.",
      parameters: {
        type: "object",
        properties: {
          field_title: {
            type: "string",
            description: "Title of the form",
          },
          field_description: {
            type: "string",
            description:
              "Description of the form. Dynamically generate if not provided.",
          },
          field_type: {
            type: "string",
            description: "Type of the field",
            enum: ["TEXT", "NUMBER", "EMAIL", "DATE"],
          },
        },
        required: ["field_title", "field_description", "field_type"],
      },
    },
  },
];

const llm_instruction =
  "You are an LLM that helps with form creation and management. Don't assume anything and ask for clarification if a user request is ambiguous or if you need any additional information. Keep your replies short and precise. Only answer questions related to your task and don't interact with the users in other means.";

export const askAI = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    let { message, aiSessionId } = req.body;

    let formId;
    const messages = [];

    // initialize aisession if it doesn't exist.
    if (!aiSessionId) {
      const aiSession = await db.aISession.create({
        data: {
          messages: [],
          userId,
        },
      });

      aiSessionId = aiSession.id;

      messages.push({
        role: "system",
        content: llm_instruction,
      });
    } else {
      const session = await db.aISession.findUnique({
        where: {
          id: aiSessionId,
        },
      });

      if (session) {
        const { messages: sessionMessages } = session;
        const x = JSON.parse(JSON.stringify(sessionMessages));
        messages.push(...x);
        formId = session.formId;
      } else {
        messages.push({
          role: "system",
          content: llm_instruction,
        });
      }
    }

    messages.push({
      role: "user",
      content: message,
    });
    console.log("User request: ", message);

    const params = {
      messages: messages,
      model: "llama3-70b-8192",
      tools,
    };

    const initialResponse = await groq.chat.completions.create(params);
    console.log("First Response: ", initialResponse.choices[0]);

    // check if the ai has returned any tool call
    const response_finish_reason = initialResponse.choices[0].finish_reason;

    if (
      response_finish_reason === "tool_calls" &&
      initialResponse.choices[0].message.tool_calls
    ) {
      console.log("Tool calls found");
      const toolCalls = initialResponse.choices[0].message.tool_calls;

      for (const toolCall of toolCalls) {
        console.log("Tool call: ", toolCall.function?.name);
        const args = JSON.parse(toolCall.function?.arguments!);

        switch (toolCall.function?.name) {
          case "create_new_form":
            const form = await db.form.create({
              data: {
                title: args.form_title,
                description: args.form_description,
                createdById: userId,
              },
            });

            // update aisession & formid
            if (form) {
              formId = form.id;

              await db.aISession.update({
                where: {
                  id: aiSessionId,
                },
                data: {
                  formId: form.id,
                },
              });

              messages.push({
                tool_call_id: toolCall.id,
                role: "tool",
                name: "create_new_form",
                content: JSON.stringify({
                  form_title: args.form_title,
                  form_description: args.form_description,
                }),
              });
            } else {
              messages.push({
                role: "assistant",
                content: "Unable to create form",
              });
            }

            break;

          case "add_form_field":
            if (formId) {
              messages.push({
                tool_call_id: toolCall.id,
                role: "tool",
                name: "add_form_field",
                content: JSON.stringify({
                  field_title: args.field_title,
                  field_description: args.field_description,
                  field_type: args.field_type,
                }),
              });

              await db.formField.create({
                data: {
                  title: args.field_title,
                  description: args.field_description,
                  type: args.field_type,
                  formId,
                },
              });
            } else {
              messages.push({
                role: "assistant",
                content:
                  "Please create or select a form in order to add fields.",
              });
            }

            break;

          default:
            throw new Error("Unknown function: " + toolCall.function?.name);
        }
      }

      // all functions have been executed
      const finalResponse = await groq.chat.completions.create({
        model: "llama3-70b-8192",
        messages,
      });

      console.log("Final response: ", finalResponse);

      messages.push({
        role: finalResponse.choices[0].message.role,
        content: finalResponse.choices[0].message.content,
      });

      await db.aISession.update({
        where: {
          id: aiSessionId,
        },
        data: {
          messages,
        },
      });

      return res.send({
        message: finalResponse.choices[0].message,
        aiSessionId,
      });
    }

    messages.push({
      role: initialResponse.choices[0].message.role,
      content: initialResponse.choices[0].message.content,
    });

    await db.aISession.update({
      where: {
        id: aiSessionId,
      },
      data: {
        messages,
      },
    });

    return res.send({
      message: initialResponse.choices[0].message,
      aiSessionId,
    });
  } catch (e) {
    console.log("Error: ", e);
    return res.send({
      message: {
        role: "assistant",
        content: "An error occured while processing your request",
      },
      error: e,
    });
  }
};
