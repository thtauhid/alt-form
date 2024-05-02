"use client";
import axios from "axios";
import {
  BotIcon,
  LoaderCircleIcon,
  SendHorizonalIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

import { useMessageStore } from "../store/messageStore";

export default function AIBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    message,
    messages,
    updateMessage,
    addMessage,
    aiSessionId,
    updateAiSessionId,
  } = useMessageStore((state) => ({
    message: state.message,
    messages: state.messages,
    updateMessage: state.updateMessage,
    addMessage: state.addMessage,
    aiSessionId: state.aiSessionId,
    updateAiSessionId: state.updateAiSessionId,
  }));

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    addMessage({ role: "user", content: message });
    updateMessage("");

    try {
      const response = await axios.post(
        "/api/ai",
        {
          message,
          aiSessionId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      addMessage(response.data.message);
      updateAiSessionId(response.data.aiSessionId);
      setLoading(false);
    } catch (error) {
      console.error(error);

      addMessage({
        role: "assistant",
        content: "I am sorry, I am not able to help you with that.",
      });

      setLoading(false);
    }
  };

  if (!isOpen)
    return (
      <button
        className="fixed bottom-4 right-4 p-4 bg-blue-400 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <BotIcon size={36} />
      </button>
    );

  return (
    <div className="fixed bottom-4 right-4 p-2 bg-blue-400 rounded-md">
      <div className="flex items-center justify-between mb-4">
        <BotIcon size={36} />
        <button>
          <XIcon size={24} onClick={handleClick} />
        </button>
      </div>
      <div className="h-96 w-96 overflow-auto p-2 space-y-2">
        <div className="bg-blue-200 p-4 rounded-md border border-gray-300">
          <p>Hi, I am ARIA. How can I help you today?</p>
        </div>

        {messages.map((message, index) => (
          <div key={index} className="border border-gray-300 rounded-md my-4">
            {message.role === "user" && (
              <p className="bg-gray-200 p-2">{message.content}</p>
            )}

            {message.role === "assistant" && (
              <p className="bg-blue-200 p-2 rounded-md">{message.content}</p>
            )}

            {message.role === "tool" && (
              <div className="bg-blue-200 p-4">
                {message.name === "create_new_form" && (
                  <p>
                    {message.content} <br />
                    Title: {message.metaData.title} <br />
                    Description: {message.metaData.description} <br />
                    Link to form:{" "}
                    <a
                      href={`/form/${message.metaData.id}`}
                      className="underline"
                    >
                      {message.metaData.title}
                    </a>
                  </p>
                )}

                {message.name === "add_form_field" && (
                  <p>
                    {message.content} <br />
                    Title: {message.metaData.title} <br />
                    Description: {message.metaData.description} <br />
                    Link to form:{" "}
                    <a
                      href={`/form/${message.metaData.formId}`}
                      className="underline"
                    >
                      {message.metaData.title}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 p-2">
        <input
          type="text"
          placeholder="Ask a question"
          className="px-4 py-2 rounded-md w-4/5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={message}
          onChange={(e) => updateMessage(e.target.value)}
        />
        {loading ? (
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold w-1/5 p-4 rounded-md focus:outline-none focus:shadow-outline flex justify-center"
            disabled
          >
            <LoaderCircleIcon size={20} className="animate-spin" />
          </button>
        ) : (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-1/5 p-4 rounded-md focus:outline-none focus:shadow-outline flex justify-center">
            <SendHorizonalIcon size={20} />
          </button>
        )}
      </form>
    </div>
  );
}
