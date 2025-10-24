import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../globals.css";

const queryClient = new QueryClient();
export default function RootLayout() {
  return(
    <QueryClientProvider client={queryClient}>
      <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" },
            sceneStyle: { backgroundColor: "#1F1F1F" },
        }}
      
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Index",
          }}
        />
        
      </Tabs>
    </QueryClientProvider>
  );
}