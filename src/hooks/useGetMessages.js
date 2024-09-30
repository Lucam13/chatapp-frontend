import { useEffect, useState } from "react";
import useArea from "../zustand/useArea"; // Cambiado de useConversation a useArea
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../redux/actions/actions";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedArea } = useArea(); // Cambiado de selectedConversation a selectedArea
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { authUser } = useAuthContext();

  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const areas = useSelector((state) => state.areas); // Cambiado de conversations a areas

  useEffect(() => {
    const fetchMessages = async () => {

      setLoading(true);
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/messages/${selectedArea._id}`, // Cambiado de conversation a area
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );
        const data = await res.json();
        console.log("data", data);
        let arr = []
        data.forEach((message) => {
          if (message.receiverId === selectedArea._id) {
            arr.push(message)
          }
        })
        console.log("mensajes filtrados", arr)  
        
        if (data.error) throw new Error(data.error);
        console.log("data", data);
        dispatch(
          getMessages({
            areaId: selectedArea._id, // Cambiado de conversationId a areaId
            messages: data,
          })
        );
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    console.log("selectedArea", selectedArea);
    console.log("ACAAAAAAAAA",areas?.find((area) => area._id === selectedArea._id).messagesLoaded)
    if (selectedArea?._id) { // Cambiado de selectedConversation a selectedArea
      const area = areas?.find((area) => area._id === selectedArea._id)
      if (
        area?.messagesLoaded == false || area?.messagesLoaded == undefined // Cambiado de conversation a area
      ) {
        console.log("fetching messages");
        fetchMessages();
      } else {
        console.log("messages already loaded");
        dispatch(
          getMessages({
            areaId: selectedArea._id, // Cambiado de conversationId a areaId
            messages: areas?.find((area) => area._id === selectedArea._id).messages, // Cambiado de conversation a area
          })
        );
      }
    }
  }, [selectedArea, messages, dispatch]); // Cambiado de selectedConversation a selectedArea

  return { messages, loading };
};
export default useGetMessages;
