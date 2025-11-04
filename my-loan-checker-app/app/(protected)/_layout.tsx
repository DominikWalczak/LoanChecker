import { Redirect, Slot } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";

export default function ProtectedLayout() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}