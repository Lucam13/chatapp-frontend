import {
  GET_AREAS,
  GET_MESSAGES,
  GET_USERS,
  NEW_MESSAGE,
  REMOVE_SHAKE,
  NEW_UNREAD_MESSAGE,
  REMOVE_UNREAD_MESSAGE,
} from "../actions/types";

const initialState = {
  areas: [],
  messages: [],
  users: [],
  fetchedAreas: false,
  fetchedUsers: false,
  unReadMessages: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AREAS:
      return {
        ...state,
        areas: action.payload.map((area) => ({
          ...area,
          messages: [], 
        })),
        fetchedAreas: true,
      };
    case GET_MESSAGES:
      return {
        ...state,
        areas: state.areas.map((area) =>
          area._id === action.payload.areaId
            ? {
                ...area,
                messagesLoaded: true,
                messages: action.payload.messages,
              }
            : area
        ),
        messages: action.payload.messages,
      };
    case GET_USERS:
      return { ...state, users: action.payload, fetchedUsers: true };
    case NEW_MESSAGE:
      return {
        ...state,
        areas: state.areas.map((area) => {
          if (area._id === action.payload.areaId) {
            return {
              ...area,
              messages: Array.isArray(area.messages)
                ? [...area.messages, action.payload.message]
                : [action.payload.message], // Asegúrate de que sea un array
            };
          }
          return area;
        }),
        messages: [...state.messages, action.payload.message],
      };
    case NEW_UNREAD_MESSAGE:
      return {
        ...state,
        unReadMessages: {
          ...state.unReadMessages,
          [action.payload]: (state.unReadMessages[action.payload] || 0) + 1,
        },
      };
    case "REMOVE_UNREAD_MESSAGE":
      const { [action.payload]: _, ...rest } = state.unReadMessages; // Elimina el área seleccionada
      return {
        ...state,
        unReadMessages: rest,
      };
    case REMOVE_SHAKE:
      return {
        ...state,
        areas: state.areas.map((area) => {
          if (area._id === action.payload.areaId) {
            return {
              ...area,
              messages: Array.isArray(area.messages)
                ? area.messages.map((message) =>
                    message._id === action.payload.messageId
                      ? { ...message, shouldShake: false }
                      : message
                  )
                : [], // Si no es un array, retornar un array vacío
            };
          }
          return area;
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
