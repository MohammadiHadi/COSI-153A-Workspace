import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Image } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import { useNotes } from "../../src/context/NotesContext";
import { useTheme } from "../../src/context/ThemeContext";

export default function NoteDetail() {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes, removeNote, updateNote } = useNotes();
  const note = id ? notes.find(note => note._id === (id)) : undefined;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note ? note.title : "");
  const [editedBody, setEditedBody] = useState(note ? note.body : "");


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
    await updateNote({title: editedTitle, body: editedBody }, id);
    setIsEditing(false);
  };


  return (
 <View style={[styles.container, { backgroundColor }]}>
      {isEditing ? (
      <>
        <Text style={[styles.h1, { color: textColor }]}>Edit Note</Text>
        <TextInput value={editedTitle} onChangeText={setEditedTitle} placeholder="Title"
          placeholderTextColor={isDarkMode ? "#777" : "#aaa"}
          style={[styles.input, {color:textColor, backgroundColor: isDarkMode?"#1e1e1e": "#f9f9f9"},]}
        />
        <TextInput value={editedBody} onChangeText={setEditedBody} placeholder="Body"
          placeholderTextColor={isDarkMode ? "#777" : "#aaa"} multiline
          style={[ styles.input, styles.multiline,
            { color: textColor, backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9" },]}
        />
        <View style={styles.row}>
          <Pressable onPress={() => setIsEditing(false)}>
            <Text style={[styles.link, { color: "#888" }]}>Cancel</Text>
          </Pressable>
          <Pressable onPress={onUpdate}>
            <Text style={[styles.link, { color: "#1f6feb" }]}>Save</Text>
          </Pressable>
        </View>
      </>  ) : (
         <>
        <Text style={[styles.h1, { color: textColor }]}>{note.title}</Text>
        <Text style={[styles.body, { color: textColor }]}>{note.body}</Text>
      {!isEditing && note?.photoUrl && (
        <View style={{ marginTop: 12 }}>
          <Image
            source={{ uri: note.photoUrl }}
            style={{ width: "100%", height: 240, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>
      )}
        <View style={styles.row}>
          <Pressable onPress={() => setIsEditing(true)}>
            <Text style={[styles.link, { color: "#1f6feb" }]}>Edit</Text>
          </Pressable>

          <Pressable onPress={() => {removeNote(note._id); router.back();}}>
            <Text style={[styles.link, { color: "tomato" }]}>Delete</Text>
          </Pressable>
        </View>
      </>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  h1: { fontSize: 20, fontWeight: "700" },
  body: { color: "#333" },
  row: { flexDirection: "row", gap: 16, marginTop: 12 },
  link: { color: "#1f6feb", fontWeight: "600" },
  input: {
borderRadius: 8,
borderWidth: 1,
borderColor: "#444",
padding: 10,
},
multiline: {
minHeight: 120,
textAlignVertical: "top",
},

});