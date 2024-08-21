import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";
import { useDispatch } from "react-redux";
import { newMessage } from "../redux/actions/actions";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessageFromArea", (message) => {
      if (selectedConversation?._id === message.areaId) {
        message.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        dispatch(
          newMessage({
            conversationId: message.areaId,
            message,
          })
        );
      }
    });
    return () => {
      socket?.off("newMessageFromArea");
    };
  }, [socket, selectedConversation, dispatch]);
};
export default useListenMessages;
