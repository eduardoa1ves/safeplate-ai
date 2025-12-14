import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  email: string;
  plan: "free" | "premium";
  freeTrialUsed: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  useFreeTrialSearch: () => boolean;
  upgradeToPremium: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "safeplate_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const saveUser = (userData: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - check if user exists in localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const existingUser = JSON.parse(stored);
      if (existingUser.email === email) {
        setUser(existingUser);
        return true;
      }
    }
    // For demo, allow any login and create user if not exists
    const newUser: User = {
      email,
      plan: "free",
      freeTrialUsed: false,
    };
    saveUser(newUser);
    return true;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    const newUser: User = {
      email,
      plan: "free",
      freeTrialUsed: false,
    };
    saveUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const useFreeTrialSearch = (): boolean => {
    if (!user) return false;
    if (user.plan === "premium") return true;
    if (user.freeTrialUsed) return false;
    
    const updatedUser = { ...user, freeTrialUsed: true };
    saveUser(updatedUser);
    return true;
  };

  const upgradeToPremium = () => {
    if (!user) return;
    const updatedUser = { ...user, plan: "premium" as const };
    saveUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        useFreeTrialSearch,
        upgradeToPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
