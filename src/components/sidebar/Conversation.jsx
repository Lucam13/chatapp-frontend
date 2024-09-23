import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const areaUsers = conversation.user_id;
  const isOnline = areaUsers.some((user) =>
    Object.values(onlineUsers).flat().includes(user._id)
  );

  const dispatch = useDispatch();
  const unReadMessages = useSelector((state) => state.unReadMessages);

  const handleClick = () => {
    setSelectedConversation(conversation);
    if (unReadMessages[conversation._id]) {
      dispatch({
        type: "REMOVE_UNREAD_MESSAGE",
        payload: conversation._id,
      });
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-green-800 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-green-600" : ""}
        ${unReadMessages[conversation._id] ? "border-l-8 border-r-8 border-orange-500" : ""}
			`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full"></div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-700">{conversation.name}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
