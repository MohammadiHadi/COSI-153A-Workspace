import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SearchBar({
  value, onChangeText, placeholder = "Search notes..."
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#1e1e1e" : "#f9f9f9";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const inputBackgroundColor = isDarkMode ? "#1e1e1e" : "#f9f9f9";
  return (
    <View style={[styles.box, { backgroundColor: backgroundColor }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.input, { backgroundColor: inputBackgroundColor, color: textColor }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginBottom: 8 },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 10, borderWidth: 1, borderColor: "#ddd" }
});