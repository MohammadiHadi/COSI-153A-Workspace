// app/(settings)/general.tsx
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const bg = isDarkMode ? "#000" : "#fff";
  const text = isDarkMode ? "#fff" : "#000";

  return (
    <>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  backgroundColor: isDarkMode ? "#000" : "#fff" }}>
      <Text style={{ color: text }}>⚙️ Settings</Text>
      <Link style={{ color: text }} href="/(settings)/notifications">Notifications</Link>
      <Link style={{ color: text }} href="/(settings)/privacy">Privacy</Link>

      <Text style={{ color: text, fontSize: 20 }}>
        {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </Text>
          <Pressable onPress={toggleTheme}>
        <Text style={{ color: isDarkMode ? "#888" : "#007AFF" }}>Toggle Theme</Text>
      </Pressable>

    </View>
    </>
  );
}
