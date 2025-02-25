import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface UserData {
  id: number;
  name: string;
  seat: string;
  is_global_admin: boolean;
}

interface UserContextType {
  currentUser: UserData  | null;
  setCurrentUser: (user: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};