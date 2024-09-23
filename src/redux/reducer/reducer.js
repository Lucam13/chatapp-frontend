import {
  GET_AREAS,
  GET_CONVERSATIONS,
  GET_MESSAGES,
  GET_USERS,
  NEW_MESSAGE,
  REMOVE_SHAKE,
  NEW_UNREAD_MESSAGE,
  REMOVE_UNREAD_MESSAGE
} from "../actions/types";

const initialState = {
  areas: [],
  conversations: [],
  messages: [],
  users: [],
  fetchedAreas: false,
  fetchedConversations: false,
  fetchedUsers: false,
  unReadMessages: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AREAS:
      return { ...state, areas: action.payload, fetchedAreas: true };
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload.map((conversation) => ({
          ...conversation,
          messagesLoaded: false,
          messages: [],
        })),
        fetchedConversations: true,
      };
    case GET_MESSAGES:
      return {
        ...state,
        conversations: state.conversations.map((conversation) =>
          conversation._id === action.payload.conversationId
            ? {
              ...conversation,
              messagesLoaded: true,
              messages: action.payload.messages,
            }
            : conversation
        ),
        messages: action.payload.messages,
      };
    case GET_USERS:
      return { ...state, users: action.payload, fetchedUsers: true };
    case NEW_MESSAGE:
      return {
        ...state,
        conversations: state.conversations.map((conversation) => {
          if (conversation._id === action.payload.conversationId) {
            return {
              ...conversation,
              messages: [...conversation.messages, action.payload.message],
            };
          }
          return conversation;
        }),
        messages: [...state.messages, action.payload.message],
      };
    case NEW_UNREAD_MESSAGE:
      return {
        ...state,
        unReadMessages: {
          ...state.unReadMessages,
          [action.payload]:
            (state.unReadMessages[action.payload] || 0) + 1,
        }
      }
    case "REMOVE_UNREAD_MESSAGE":
      const { [action.payload]: _, ...rest } = state.unReadMessages; // Elimina el área seleccionada
      return {
        ...state,
        unReadMessages: rest,
      };

    case REMOVE_SHAKE:
      return {
        ...state,
        conversations: state.conversations.map((conversation) => {
          if (conversation._id === action.payload.conversationId) {
            return {
              ...conversation,
              messages: conversation.messages.map((message) =>
                message._id === action.payload.messageId
                  ? { ...message, shouldShake: false }
                  : message
              ),
            };
          }
          return conversation;
        }),
        messages: state.messages.map((message) =>
          message._id === action.payload.messageId
            ? { ...message, shouldShake: false }
            : message
        ),
      };
    default:
      return state;
  }
};

export default reducer;
