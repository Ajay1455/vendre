import React, { useEffect } from "react";
import { useReducer, createContext } from "react";
import AuthReducer from './AuthReducer';

const InitialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false
};

export const AuthContext = createContext(InitialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, InitialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
