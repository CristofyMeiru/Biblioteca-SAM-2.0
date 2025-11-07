'use client';
import { authClient } from '@/lib/auth-client';
import { Session, User } from 'better-auth';
import React, { createContext, useContext } from 'react';

interface UserRole extends User {
  role: 'admin' | 'user';
}
interface AuthContext {
  session: { user: UserRole; session: Session } | null | undefined;
  isLoading: boolean;
}

const authContext = createContext({} as AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending: isLoading } = authClient.useSession() as unknown as {
    data: AuthContext['session'];
    isPending: boolean;
  };

  return <authContext.Provider value={{ session, isLoading }}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
