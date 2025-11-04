import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean; 
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) setAccessToken(token);
      setLoading(false);
    };

    loadToken();
  }, []);


  const login = async (token: string) => {
    await SecureStore.setItemAsync("accessToken", token);
    setAccessToken(token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    setAccessToken(null);
  };

  if (loading) return null; 

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!accessToken,
      accessToken,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;