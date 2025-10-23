import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const bgColor = isDarkMode ? "#000" : "#fff";
  const textColor = isDarkMode ? "#fff" : "#000";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={{ color: textColor, fontSize: 20 }}>
        {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </Text>
      <Pressable onPress={toggleTheme} style={[styles.pressable, { borderColor: isDarkMode ? "#888" : "#007AFF" }]}>
        <Text style={{ color: isDarkMode ? "#888" : "#007AFF" }}>{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center", justifyContent: "center" },
  h1: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  pressable: { marginTop: 20, padding: 10, borderWidth: 1, borderRadius: 5 },
});