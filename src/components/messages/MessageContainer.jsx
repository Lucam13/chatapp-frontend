import { useEffect, useState } from "react";
import useArea from "../../zustand/useArea"; // Cambiado de useConversation a useArea
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import SearchMessages from "./SearchBar.jsx";

const MessageContainer = () => {
  const { selectedArea, setSelectedArea } = useArea(); // Cambiado de selectedConversation a selectedArea
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedArea(null); // Cambiado de setSelectedConversation a setSelectedArea
  }, [setSelectedArea]);

  return (
    <div className="md:min-w-[650px] flex flex-col">
      {!selectedArea ? ( // Cambiado de selectedConversation a selectedArea
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-orange-300 px-4 py-2 mb-2 flex justify-between items-center">
            <span className="label-text text-white">Para:</span>{" "}
            <span className="text-white font-bold">
              {selectedArea.name} {/* Cambiado de selectedConversation.name a selectedArea.name */}
            </span>
            <SearchMessages onSearch={handleSearch} />
          </div>
          <Messages searchTerm={searchTerm} />
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
        <p>Selecciona un área para comenzar a chatear</p> {/* Cambiado de "conversación" a "área" */}
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
