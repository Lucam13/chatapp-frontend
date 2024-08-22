import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../redux/actions/actions";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useConversation();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { authUser } = useAuthContext();

  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const conversations = useSelector((state) => state.conversations);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/messages/${selectedConversation._id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        dispatch(
          getMessages({
            conversationId: selectedConversation._id,
            messages: data,
          })
        );
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      if (
        conversations?.find(
          (conversation) => conversation._id === selectedConversation._id
        )?.messagesLoaded === false
      ) {
        fetchMessages();
      } else {
        dispatch(
          getMessages({
            conversationId: selectedConversation._id,
            messages: conversations?.find(
              (conversation) => conversation._id === selectedConversation._id
            ).messages,
          })
        );
      }
    }
  }, [selectedConversation, messages, dispatch]);

  return { messages, loading };
};
export default useGetMessages;
