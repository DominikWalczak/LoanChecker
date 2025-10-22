import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "(tabs)",
          headerShown: false,
        }}
      
      />
      <Stack.Screen
        name="my_loans"
        options={{
          title: "My Loans",
          headerStyle: {
            backgroundColor: "#1F1F1F",
          },
          headerTintColor: "#EAEAEA",
        }}
      />
      <Stack.Screen
        name="issued_loans"
        options={{
          title: "Issued Loans",
          headerStyle: {
            backgroundColor: "#1F1F1F",
          },
          headerTintColor: "#EAEAEA",
        }}
      />
      <Stack.Screen
        name="friends"
        options={{
          title: "Friends",
          headerStyle: {
            backgroundColor: "#1F1F1F",
          },
          headerTintColor: "#EAEAEA",
        }}
      
      />
    </Stack>
  );
}