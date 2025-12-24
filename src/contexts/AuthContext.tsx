import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  isPremium: boolean;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  addCredits: (amount: number) => void;
  useCredit: () => boolean;
  upgradeToPremium: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email && password.length >= 6) {
      setUser({
        id: "mock-user-1",
        email,
        name: email.split("@")[0],
        credits: 5, // New users start with 5 free credits
        isPremium: false,
      });
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration
    if (email && password.length >= 6 && name) {
      setUser({
        id: "mock-user-" + Date.now(),
        email,
        name,
        credits: 10, // New registrations get 10 free credits
        isPremium: false,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addCredits = (amount: number) => {
    if (user) {
      setUser({ ...user, credits: user.credits + amount });
    }
  };

  const useCredit = (): boolean => {
    if (!user) return false;
    if (user.isPremium) return true; // Premium users have unlimited searches
    if (user.credits > 0) {
      setUser({ ...user, credits: user.credits - 1 });
      return true;
    }
    return false;
  };

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, isPremium: true, credits: 999 });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        addCredits,
        useCredit,
        upgradeToPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
