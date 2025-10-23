import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import type { NoteItem } from "./types";
import { useTheme } from "../context/ThemeContext";

export default function NoteCard({ note }: { note: NoteItem }) {
  const { isDarkMode } = useTheme();

  const backgroundColor = isDarkMode ? "#1e1e1e" : "#f9f9f9";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const subTextColor = isDarkMode ? "#bbbbbb" : "#444444";
  const borderColor = isDarkMode ? "#333" : "#ddd";

  return (
    <Link href={{ pathname: "/note/[id]", params: { id: note.id } }} asChild>
      <Pressable style={[styles.card, { backgroundColor, borderColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{note.title}</Text>
        <Text numberOfLines={2} style={[styles.body, { color: subTextColor }]}>
          {note.body}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
});