import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/context/ThemeContext";

export default function TabsLayout() {
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? "#121212" : "#ffffff";
  const inactiveTintColor = isDarkMode ? "#888888" : "#888888";
  const activeTintColor = isDarkMode ? "#ffffff" : "#000000";
  return (
    <Tabs screenOptions={{
      tabBarStyle: { backgroundColor: bgColor },
      tabBarActiveTintColor: activeTintColor,
      tabBarInactiveTintColor: inactiveTintColor,
      headerStyle: { backgroundColor: bgColor },
      headerTitleStyle: { color: activeTintColor },
      headerTintColor: activeTintColor,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}