import {
  GET_AREAS,
  GET_CONVERSATIONS,
  GET_MESSAGES,
  GET_USERS,
  NEW_MESSAGE,
  REMOVE_SHAKE,
  SELECT_CONVERSATION,
} from "./types";

export const getConversations = (conversations) => (dispatch) => {
  dispatch({
    type: GET_CONVERSATIONS,
    payload: conversations,
  });
};

export const getAreas = (areas) => (dispatch) => {
  dispatch({
    type: GET_AREAS,
    payload: areas,
  });
};

export const getMessages = (messages) => (dispatch) => {
  dispatch({
    type: GET_MESSAGES,
    payload: messages,
  });
};

export const getUsers = (users) => (dispatch) => {
  dispatch({
    type: GET_USERS,
    payload: users,
  });
};

export const newMessage = (message) => (dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    payload: message,
  });
};

export const removeShake = (message) => (dispatch) => {
  dispatch({
    type: REMOVE_SHAKE,
    payload: message,
  });
};

export const selectConversation = (conversationId) => (dispatch) => {
  dispatch({
    type: SELECT_CONVERSATION,
    payload: { conversationId },
  });
};
