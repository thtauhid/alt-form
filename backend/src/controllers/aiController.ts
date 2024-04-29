import db from "../utils/db";
import { GROQ_API_KEY } from "../constants";
import { Request, Response } from "express";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

const tools = [
  {
    type: "function",
    function: {
      name: "get_form_details",
      description: "Get form details.",
      parameters: {
        type: "object",
        properties: {
          form_title: {
            type: "string",
            description: "Title of the form",
          },
          form_description: {
            type: "string",
            description: "Description of the form",
          },
        },
        required: ["form_title", "form_description"],
      },
    },
  },
];

export const askAI = async (req: Request, res: Response) => {
  const { message } = req.body;
  const { id } = req.user;

  const params = {
    messages: [
      {
        role: "system",
        content:
          "You are an LLM that gets the form/field title and description using function get_form_details or get_form_field",
      },
      { role: "user", content: message },
    ],
    model: "llama3-70b-8192",
    tools,
  };

  const aiResponse = await groq.chat.completions.create(params);

  // Figure out what function to call
  const toolCalls = aiResponse.choices[0].message.tool_calls;

  if (toolCalls) {
    for (const toolCall of toolCalls) {
      if (toolCall.function?.name === "get_form_details") {
        const args = JSON.parse(toolCall.function.arguments!);

        const { form_title, form_description } = args;

        // Create the form
        const form = await db.form.create({
          data: {
            title: form_title,
            description: form_description,
            createdById: id,
          },
        });

        if (form)
          return res.send(
            "Form created successfully. Title: " +
              form_title +
              ". Description: " +
              form_description
          );

        return res.send("Failed to create form.");
      }
    }
  }
};
