import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";

export default function AuthLayout() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  if (isLoggedIn) {
    return <Redirect href="/(protected)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options=
        {{ title: "Login", 
          headerStyle: { backgroundColor: "#1F1F1F", },
          headerTintColor: "#EAEAEA", 
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="register"
        options={{ 
          title: "Register", 
          headerStyle: { backgroundColor: "#1F1F1F", }, 
          headerTintColor: "#EAEAEA", 
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}