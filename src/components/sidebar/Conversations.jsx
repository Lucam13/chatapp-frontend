import useGetConversations from "../../hooks/useGetConversations";

import Conversation from "./Conversation";

const Conversations = ({ showAllAreas }) => {
  const { loading, conversations } = useGetConversations();

  const filteredConversations = showAllAreas
    ? conversations
    : conversations.filter(
        (conversation) => conversation.name !== "ADMINISTRACIÓN"
      );
      
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === filteredConversations.length - 1}
        />
      ))}

      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};

export default Conversations;