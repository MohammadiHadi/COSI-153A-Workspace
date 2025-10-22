import { Tabs } from "expo-router";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import {Drawer} from 'expo-router/drawer';


export default function TabsLayout() {
  const { isDarkMode } = useTheme();
  const bg = isDarkMode ? "#000" : "#fff";
  const text = isDarkMode ? "#fff" : "#000";


  return (
    <Drawer screenOptions={{
        headerStyle: { backgroundColor: bg },
        headerTitleStyle: { color: text },
        drawerStyle: { backgroundColor: bg },
        drawerActiveTintColor: text,
        drawerInactiveTintColor: isDarkMode ? "#999" : "#777",
      }}
>
      <Drawer.Screen name="index" options={{ title: "Home", drawerIcon: ({color, size, focused}) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} /> }} />
      <Drawer.Screen name="search" options={{ title: "Search", drawerIcon: ({color, size, focused}) => <MaterialIcons name={focused ? 'search' : 'search-off'} size={size} color={color} /> }} />
      <Drawer.Screen name="profile" options={{ title: "Profile", drawerIcon: ({color, size, focused}) => <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} /> }} />
    </Drawer>
  );
}
