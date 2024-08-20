import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();
	const { selectedConversation } = useConversation();

	useEffect(() => {
		socket?.on("newMessageFromArea", (newMessage) => {
			if (selectedConversation?._id === newMessage.areaId) {
				newMessage.shouldShake = true;
				const sound = new Audio(notificationSound);
				sound.play();
				setMessages([...messages, newMessage]);
			}
		});
		return () => {
			socket?.off("newMessageFromArea");
		};
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
