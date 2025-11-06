import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useNotes } from "../../src/context/NotesContext";
import { useTheme } from "../../src/context/ThemeContext";
import SearchBar from "../../src/components/SearchBar";
import NotesList from "../../src/components/NotesList";
import { BASE_URL } from "../../src/config";
import { NoteItem } from "../../src/components/types";

export default function HomeScreen() {
  // const { notes } = useNotes();
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";

  useEffect(() => { 
  const load = async () => {
  try {
    const res = await fetch(`${BASE_URL}/notes`);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const data = (await res.json()) as NoteItem[]; 
    setNotes(data);
  } catch (e) {
    console.error("Load notes error:", e);
  } finally {
    setLoading(false);
  }
};
load();
}, []);


  const filtered = notes.filter((n) => {
    const q = query.trim().toLowerCase();
    return !q || (n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
  });

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: textColor }]}>Your Notes</Text>
        <Link href="/note/new" style={[styles.newLink, { color: textColor }]}>+ New</Link>
      </View>
      <SearchBar value={query} onChangeText={setQuery} />
      <NotesList data={filtered} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 18, fontWeight: "700" },
  newLink: { fontWeight: "600" },
});