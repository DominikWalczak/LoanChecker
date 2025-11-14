import { Redirect, Slot } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../src/context/AuthContext";

export default function ProtectedLayout() {
  const { isLoggedIn, loading, refreshToken } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      refreshToken();
      console.log(9999);
    }, 10 * 1000 * 60);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  if (loading) return null;

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}