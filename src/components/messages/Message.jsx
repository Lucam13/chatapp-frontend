import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import useUsers from "../../hooks/useGetUsers";
import { useDispatch } from "react-redux";
import { removeShake } from "../../redux/actions/actions";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const { users, loading } = useUsers();
	const fromMe = message.senderId._id === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = message.senderId.profilePic;
	const bubbleBgColor = fromMe ? "bg-orange-300" : "bg-green-500";
	const shakeClass = message.shouldShake ? "shake" : "";
	const senderName = message.senderId.fullName;

	const dispatch = useDispatch();

	if (message.shouldShake) {
		setTimeout(() => {
			dispatch(
				removeShake({
					conversationId: selectedConversation._id,
					messageId: message._id,
				})
			);
		}, 1000);
	}

	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img alt="Tailwind CSS chat bubble component" src={profilePic} />
				</div>
			</div>
			<div
				className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
			>
				{message.message}
			</div>
			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-black">
				{formattedTime}
				<span className="font-bold">{senderName} </span>
			</div>
		</div>
	);
};
export default Message;