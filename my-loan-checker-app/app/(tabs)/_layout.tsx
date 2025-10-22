import { Tabs } from "expo-router";
import "../globals.css";


export default function RootLayout() {
  return(
    <>
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
    </>
  );
}