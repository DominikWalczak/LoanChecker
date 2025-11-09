import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import env from '../env';

type AuthContextType = {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (access: string, refresh: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean; 
  refreshToken: () => Promise<void>;
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


  async function login(access: string, refresh: string){
    await SecureStore.setItemAsync("accessToken", access);
    await SecureStore.setItemAsync("refreshToken", refresh);
    setAccessToken(access);
  }

  async function logout(){
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    setAccessToken(null);
  }

  async function refreshToken() {
    const refresh = await SecureStore.getItemAsync("refreshToken")
    console.log("REFRESH TOKEN:", refresh);
    if (!refresh) {
      console.log("Brak refresh token — wylogowuję");
      await logout();
      return null;
    }

    try {
      const response = await fetch(`${env.IP}/auth/refresh`, { // trzeba dorobić to w backendzie
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refresh }),
      });

      console.log("REFRESH RESPONSE STATUS:", response.status);

      if (!response.ok) {
        const errJson = await response.json().catch(() => null);
        console.log("REFRESH ERROR:", errJson);
        await logout();
        return null;
      }

      const data = await response.json();
      console.log("NEW TOKEN:", data.accessToken);

      await SecureStore.setItemAsync("accessToken", data.accessToken);
      setAccessToken(data.accessToken);

      return data.accessToken;
    } catch (error) {
      alert(`Error refreshing token: ${error}`);
      console.log(`Error refreshing token: ${error}`);
      await logout();
      return null;
    }
  }

  if (loading) return null; 

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!accessToken,
      accessToken,
      login,
      logout,
      loading,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;