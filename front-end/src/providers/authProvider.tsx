import React, { createContext } from "react";

const authContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <authContext.Provider value={{}}>{children}</authContext.Provider>;
}

