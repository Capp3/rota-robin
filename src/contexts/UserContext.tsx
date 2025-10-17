import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, currentUser, setCurrentUser as setMockCurrentUser } from '@/lib/mockData';

interface UserContextType {
  user: Employee | null;
  setUser: (user: Employee | null) => void;
  isManager: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Employee | null>(currentUser);

  const isManager = user?.role === 'MANAGER';

  const handleSetUser = (newUser: Employee | null) => {
    setUser(newUser);
    if (newUser) {
      setMockCurrentUser(newUser);
      localStorage.setItem('currentUserId', newUser.id);
    } else {
      localStorage.removeItem('currentUserId');
    }
  };

  const logout = () => {
    handleSetUser(null);
  };

  useEffect(() => {
    // Check if user was previously logged in
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId && user) {
      // User is already set from mockData
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, isManager, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
