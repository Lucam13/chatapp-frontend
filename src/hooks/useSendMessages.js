import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { newMessage } from "../redux/actions/actions";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();

  const emitMessageToArea = ({ message, areaId, senderId, receiverId }) => {
    socket.emit("sendMessageToArea", {
      message,
      areaId,
      senderId,
      receiverId,
    });
  };

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Emit the message to the server
      emitMessageToArea({
        message: data.message,
        areaId: selectedConversation._id,
        senderId: {
          _id: authUser._id,
          fullName: authUser.fullName,
          profilePic: authUser.profilePic,
        },
        receiverId: data.receiverId,
      });

      dispatch(
        newMessage({
          conversationId: selectedConversation._id,
          message: {
            ...data,
            senderId: {
              _id: authUser._id,
              fullName: authUser.fullName,
              profilePic: authUser.profilePic,
            },
          },
          listened: false,
        })
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
