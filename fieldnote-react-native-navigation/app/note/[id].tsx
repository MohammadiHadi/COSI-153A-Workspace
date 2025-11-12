import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { useNotes } from "../../src/context/NotesContext";
import { useTheme } from "../../src/context/ThemeContext";

export default function NoteDetail() {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes, removeNote, updateNote } = useNotes();
  const note = id ? notes.find(note => note._id === (id)) : undefined;

  if (!note) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.h1, { color: textColor }]}>Note not found.</Text>
        <Link href="/" style={{ color: textColor }}>Go Home</Link>
      </View>
    );
  }

  const onUpdate = async () => {
    if (!id) return;
    await updateNote({title: "Weather forecast today", body: "It's cloudy with a possible rain" }, id);
    // setIsEditing(false);
  };


  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.h1, { color: textColor }]}>{note.title}</Text>
      <Text style={[styles.body, { color: textColor }]}>{note.body}</Text>

      <View style={styles.row}>
        <Pressable onPress={onUpdate}>
          <Text style={styles.link}>Edit</Text>
        </Pressable>

        <Link href="/" asChild>
          <Text
            style={styles.link}
            onPress={() => removeNote(note._id)}
          >
            Delete
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  h1: { fontSize: 20, fontWeight: "700" },
  body: { color: "#333" },
  row: { flexDirection: "row", gap: 16, marginTop: 12 },
  link: { color: "#1f6feb", fontWeight: "600" }
});