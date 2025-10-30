'use client';
import { authClient } from '@/lib/auth-client';
import { Session, User } from 'better-auth';
import React, { createContext, useContext } from 'react';

interface AuthContext {
  session: { user: User; session: Session } | null | undefined;
  isLoading: boolean;
}

const authContext = createContext({} as AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending: isLoading } = authClient.useSession();

  
  return <authContext.Provider value={{ session, isLoading }}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
