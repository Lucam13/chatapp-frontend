import { create } from "zustand";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),

  // This will fetch messages and populate them with sender info
  fetchAndSetMessages: async (conversationId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/messages/${conversationId}`, {
        method: "GET",
        credentials: "include",
      });
      const messages = await res.json();
      set({ messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
}));

export default useConversation;
