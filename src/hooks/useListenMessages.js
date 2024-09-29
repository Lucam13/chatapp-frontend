import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import useArea from "../zustand/useArea"; // Cambiado de useConversation a useArea
import notificationSound from "../assets/sounds/notification.mp3";
import { useDispatch } from "react-redux";
import { newMessage } from "../redux/actions/actions";
import useGetAreas from "./useGetAreas";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedArea } = useArea(); // Cambiado de selectedConversation a selectedArea
  const dispatch = useDispatch();
  const { areas } = useGetAreas();

  useEffect(() => {
    socket?.on("newMessageFromArea", (message) => {
      // Buscar el nombre del área correspondiente al areaId
      const area = areas.find((a) => a._id === message.areaId);
      const areaName = area ? area.name : "desconocida"; // Manejar caso cuando no se encuentra el área

      if (selectedArea?._id === message.areaId) { // Cambiado de selectedConversation a selectedArea
        message.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();

        dispatch(
          newMessage({
            areaId: message.areaId, // Cambiado de conversationId a areaId
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
        dispatch({
          type: "NEW_UNREAD_MESSAGE",
          payload: message.areaId,
        });

        dispatch(
          newMessage({
            areaId: message.areaId, // Cambiado de conversationId a areaId
            message,
          })
        );
      }
    });
    return () => {
      socket?.off("newMessageFromArea");
    };
  }, [socket, selectedArea, dispatch, areas]); // Cambiado de selectedConversation a selectedArea
};

export default useListenMessages;
