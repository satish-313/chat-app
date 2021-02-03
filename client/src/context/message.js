import React, { createContext, useReducer, useContext } from "react";

const messageReducer = (state, action) => {
  let userscopy;
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_USER_MESSAGES":
      const { user, messages } = action.payload;
      userscopy = [...state.users];
      const userIndex = userscopy.findIndex((u) => u.user === user);
      userscopy[userIndex] = { ...userscopy[userIndex], messages };
      return {
        ...state,
        users: userscopy,
      };
    case "SET_SELECTED_USER":
      userscopy = state.users.map((user) => ({
        ...user,
        selected: user.user === action.payload,
      }));
      return {
        ...state,
        users: userscopy,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null });

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageStateContext);
export const useMessageDispatch = () => useContext(MessageDispatchContext);
