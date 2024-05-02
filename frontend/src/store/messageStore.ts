import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type MessageRequest = {
  role: "user";
  content: string;
  metaData?: any;
};

type MessageResponse = {
  role: "assistant";
  content: string;
};

type ToolResponse = {
  role: "tool";
  tool_call_id: string;
  name: string;
  content: string;
  metaData?: any;
};

type Message = MessageRequest | MessageResponse | ToolResponse;

interface MessageStore {
  message: string;
  messages: Message[];
  aiSessionId: string | undefined;

  updateMessage: (message: string) => void;
  addMessage: (message: Message) => void;
  updateAiSessionId: (id: string) => void;

  clearMessage: () => void;
  clearMessages: () => void;
  clearAiSessionId: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  message: "",
  messages: [],
  aiSessionId: undefined,

  updateMessage: (message) => set({ message }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateAiSessionId: (id) => set({ aiSessionId: id }),

  clearMessage: () => set({ message: "" }),
  clearMessages: () => set({ messages: [] }),
  clearAiSessionId: () => set({ aiSessionId: undefined }),
}));
