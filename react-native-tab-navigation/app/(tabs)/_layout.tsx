import { Tabs } from "expo-router";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import {Drawer} from 'expo-router/drawer';


export default function TabsLayout() {
  const { isDarkMode } = useTheme();
  const bg = isDarkMode ? "#000" : "#fff";
  const text = isDarkMode ? "#fff" : "#000";


  return (
//     <Tabs screenOptions={{
//         tabBarStyle: { backgroundColor: isDarkMode ? "#111" : "#eee",},
//         tabBarActiveTintColor: isDarkMode ? "#fff" : "#000",
//         tabBarInactiveTintColor: isDarkMode ? "#999" : "#777",
//         headerStyle: { backgroundColor: isDarkMode ? "#000" : "#fff",},
//         headerTitleStyle: { color: isDarkMode ? "#fff" : "#000",},
//       }}
// >
//       <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({color, size, focused}) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} /> }} />
//       <Tabs.Screen name="search" options={{ title: "Search", tabBarIcon: ({color, size, focused}) => <MaterialIcons name={focused ? 'search' : 'search-off'} size={size} color={color} /> }} />
//       <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({color, size, focused}) => <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} /> }} />
//     </Tabs>
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
