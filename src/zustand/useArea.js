import { create } from "zustand";
import { useAuthContext } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useArea = create((set) => ({
  selectedArea: null,
  setSelectedArea: (selectedArea) => set({ selectedArea }),
  messages: [],
  setMessages: (messages) => set({ messages }),

  // Fetch messages related to a specific area and populate them with sender info
  fetchAndSetMessages: async (areaId) => {
    const { authUser } = useAuthContext();
    try {
      const res = await fetch(`${BACKEND_URL}/api/messages/${areaId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      const messages = await res.json();
      set({ messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
}));

export default useArea;
