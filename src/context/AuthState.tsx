"use client";

import React, { createContext, ReactNode, useState, useContext } from "react";

type AuthStateProps = {
  authKey: string;
  updateKey: (key: string) => void;
  deleteKey: () => void;
};

const AuthState = createContext<AuthStateProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authKey, setAuthKey] = useState("");

  const updateKey = (key: string) => {
    setAuthKey(key);
  };

  const deleteKey = () => {
    setAuthKey("");
  };

  return <AuthState.Provider value={{ authKey, updateKey, deleteKey }}>{children}</AuthState.Provider>;
};

export const useAuthState = () => {
  const state = useContext(AuthState);
  if (state === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return state;
};
