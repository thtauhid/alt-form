"use client";

import axios from "axios";
import { SendHorizonalIcon } from "lucide-react";
import { useState } from "react";

export default function AskAI() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([
    "Hello! I am an AI. Ask me anything!",
  ]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setMessages((prevMessages) => [message, ...prevMessages]);
    setMessage("");

    axios
      .post(
        "/api/ai",
        { message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setMessages((prevMessages) => [data, ...prevMessages]);
      })
      .catch((error) => {
        setMessages((prevMessages) => [
          "Sorry, I am unable to answer your question.",
          ...prevMessages,
        ]);
      });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          placeholder="Ask a question"
          className="p-4 rounded-md w-4/5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-1/5 p-4 rounded-md focus:outline-none focus:shadow-outline flex justify-center">
          <SendHorizonalIcon size={36} />
        </button>
      </form>

      {messages.map((message, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded-md my-4">
          {message}
        </div>
      ))}
    </div>
  );
}
