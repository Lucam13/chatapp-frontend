import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";
import { useDispatch } from "react-redux";
import { newMessage } from "../redux/actions/actions";
import useGetAreas from "./useGetAreas";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  const dispatch = useDispatch();
  const { areas } = useGetAreas();

  useEffect(() => {
    socket?.on("newMessageFromArea", (message) => {
      // Buscar el nombre del área correspondiente al areaId
      const area = areas.find((a) => a._id === message.areaId);
      const areaName = area ? area.name : "desconocida"; // Manejar caso cuando no se encuentra el área

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
      } else {
        toast(`Tienes mensajes nuevos de la área ${areaName}`, {
          icon: '✉️',
          duration: 12000,
          style: {
            background: '#ea580c', 
            color: '#ffffff',      
            fontSize: '18px', 
            fontWeight: 'bold', 
            padding: '16px',  
            borderRadius: '10px',
            border: '8px solid #65a30d',
          },
        });

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
  }, [socket, selectedConversation, dispatch, areas]); // Asegurarse de incluir 'areas' en las dependencias del useEffect
};

export default useListenMessages;
