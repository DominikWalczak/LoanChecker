import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import "../globals.css";

const queryClient = new QueryClient();
export default function RootLayout() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const [x, setX] = useState(0);
  useEffect(() =>{
    if (x < 10){
      setX((prev) => prev + 1);
    }
    if (x === 10){
      console.log(x);
      router.replace('../login');
    }
  }, [x]);
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