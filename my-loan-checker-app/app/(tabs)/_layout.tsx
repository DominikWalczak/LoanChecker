import { Tabs } from "expo-router";
import "../globals.css";

export default function RootLayout() {
  return(
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Index",
        }}
      />
      
    </Tabs>
  );
}