import { useDispatch } from "react-redux";
import { selectConversation } from "../../redux/actions/actions";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const dispatch = useDispatch();
  
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const areaUsers = conversation.user_id;
  const isOnline = areaUsers.some((user) =>
    Object.values(onlineUsers).flat().includes(user._id)
  );

  const handleConversationClick = () => {
    setSelectedConversation(conversation); // Actualiza el estado local de la conversación seleccionada
    dispatch(selectConversation(conversation._id)); // Resetea el contador de mensajes no leídos en Redux
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-green-800 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-green-600" : ""}
			`}
        onClick={handleConversationClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full"></div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-700">{conversation.name}</p>
            <span className="text-xl">{emoji}</span>
          </div>
          {/* Mostrar el número de mensajes no leídos */}
          {conversation.unreadCount > 0 && (
            <span className="badge bg-red-500 text-white flex">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
