import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { useNotes } from "../../src/context/NotesContext";
import { useTheme } from "../../src/context/ThemeContext";
import {router } from "expo-router";

export default function NewNote() {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const inputBackgroundColor = isDarkMode ? "#1e1e1e" : "#f9f9f9";
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

   const onSave = async () => {
    if (!title.trim() && !body.trim()) return;

    await addNote({
      title,
      body,
      createdAt: Date.now(),
    });

    router.back(); 
  };

  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.h1, { color: textColor }]}>New Note</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={[styles.input, { color: textColor, backgroundColor: inputBackgroundColor }]}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Write something..."
        multiline
        style={[styles.input, styles.multiline, { color: textColor }, { backgroundColor: inputBackgroundColor }]}
      />

      <View style={styles.actions}>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.btn, { color: textColor }]}>Cancel</Text>
        </Pressable>

        <Pressable onPress={onSave}>
          <Text
            style={[styles.btn, { color: textColor }]}
        
          >
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  h1: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  input: { backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "#ddd", padding: 10 },
  multiline: { minHeight: 120, textAlignVertical: "top" },
  actions: { flexDirection: "row", gap: 12, marginTop: 8 },
  btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, overflow: "hidden", fontWeight: "600" },
  cancel: { backgroundColor: "#eee", color: "#333" },
  save: { backgroundColor: "#1f6feb", color: "#fff" }
});