import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1F1F1F",
        },
        headerTintColor: "#EAEAEA",
        headerTitleStyle: {
          color: "#EAEAEA",
        },
        sceneStyle: {
          backgroundColor: "#1F1F1F",
        },
        tabBarStyle: {
          display: "none",
        },
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Index",
        }}
      />

      <Tabs.Screen
        name="my_loans"
        options={{
          title: "My Loans",
        }}
      />

      <Tabs.Screen
        name="issued_loans"
        options={{
          title: "Issued Loans",
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
        }}
      />
    </Tabs>
  );
}