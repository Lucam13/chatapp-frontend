import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { useSelector } from "react-redux";

const Messages = ({ searchTerm }) => {
  const { loading } = useGetMessages();
  const messages = useSelector((state) => state.messages);
  console.log("messages", messages);
  useListenMessages();
  const lastMessageRef = useRef();

  // Ordenar los mensajes por fecha de creación (createdAt)
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  // Filtrar los mensajes según el término de búsqueda
  const filteredMessages = searchTerm
    ? sortedMessages.filter((message) =>
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sortedMessages;

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [filteredMessages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        filteredMessages?.length > 0 &&
        filteredMessages.map((message, index) => (
          <div key={message._id || index} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && filteredMessages?.length === 0 && (
        <p className="text-center">
          {searchTerm
            ? "No se encontraron mensajes que coincidan con la búsqueda."
            : "Envía un mensaje para empezar la conversación!"}
        </p>
      )}
    </div>
  );
};

export default Messages;
