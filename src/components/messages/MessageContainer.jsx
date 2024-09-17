import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import SearchMessages from "./SearchBar.jsx";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[650px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-orange-300 px-4 py-2 mb-2 flex justify-between items-center">
            <span className="label-text text-white">Para:</span>{" "}
            <span className="text-white font-bold">
              {selectedConversation.name}
            </span>
            <SearchMessages onSearch={handleSearch} />
          </div>
          <Messages searchTerm={searchTerm}/>
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-800 font-semibold flex flex-col items-center gap-2">
        <p>Bienvenido 👋 {authUser.fullName} ❄</p>
        <p>Selecciona un area para comenzar a chatear</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
