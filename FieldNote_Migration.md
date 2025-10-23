# FieldNote React Native Migration to Expo Router

This guide describes how to migrate **fieldnote-react-native** into a **multi-screen Expo Router app**. It follows only the concepts covered in your three class samples.

---

## 1. Create a new Expo Router app (TypeScript)
```bash
npx create-expo-app fieldnote-react-native-navigation --template
npx expo install react@19.1.0 react-dom@19.1.0 expo-router react-native-safe-area-context react-native-screens @expo/vector-icons   
```

Enable Expo Router in `package.json`:

```json
{
  "main": "expo-router/entry",
}
```

---

## 2. Folder Structure

```
fieldnote-react-native-navigation/
  app/
    _layout.tsx
    (tabs)/
      _layout.tsx
      index.tsx
      settings.tsx
    note/
      [id].tsx
      new.tsx
  src/
    context/
      NotesContext.tsx
      ThemeContext.tsx
    components/
      SearchBar.tsx
      NotesList.tsx
      NoteCard.tsx
      types.tsx
```

---

## 3. Contexts 

### NotesContext: `src/context/NotesContext.tsx`

`src/context/NotesContext.tsx`

```tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { NoteItem } from "../components/types";

type NotesCtx = {
  notes: NoteItem[];
  addNote: (title: string, body: string) => void;
  removeNote: (id: string) => void;
  getNote: (id: string) => NoteItem | undefined;
};

const NotesContext = createContext<NotesCtx | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<NoteItem[]>([
    { id: "1", title: "Welcome", body: "Your first note!", createdAt: Date.now() }
  ]);

  const addNote = (title: string, body: string) => {
    const id = String(Date.now());
    setNotes((prev) => [{ id, title, body, createdAt: Date.now() }, ...prev]);
  };

  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const getNote = (id: string) => notes.find((n) => n.id === id);

  const value = { notes, addNote, removeNote, getNote };
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}
```

### ThemeContext: `src/context/ThemeContext.tsx`

```tsx
import { createContext, useState, useContext } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const value = { isDarkMode, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

Wrap providers in `app/_layout.tsx`:

```tsx
import { Stack } from "expo-router";
import { NotesProvider } from "../src/context/NotesContext";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext";

export default function RootLayout() {

  return (
    <NotesProvider>
      <ThemeProvider>
        <ThemedNotesRootLayout />
      </ThemeProvider>
    </NotesProvider>
  );
}

function ThemedNotesRootLayout() {
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: bgColor },
      headerTitleStyle: { color: textColor },
      headerTintColor: textColor,
    }}>
      <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="note" options={{ title: "Home", headerShown: true }} />
      <Stack.Screen name="note/[id]" options={{ title: "Note" }} />
      <Stack.Screen name="note/new" options={{ title: "New Note" }} />
    </Stack>
  );
}
```

---

## 4. Tabs Layout

`app/(tabs)/_layout.tsx`

```tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/context/ThemeContext";

export default function TabsLayout() {
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? "#121212" : "#ffffff";
  const inactiveTintColor = isDarkMode ? "#888888" : "#888888";
  const activeTintColor = isDarkMode ? "#ffffff" : "#000000";
  return (
    <Tabs screenOptions={{
      tabBarStyle: { backgroundColor: bgColor },
      tabBarActiveTintColor: activeTintColor,
      tabBarInactiveTintColor: inactiveTintColor,
      headerStyle: { backgroundColor: bgColor },
      headerTitleStyle: { color: activeTintColor },
      headerTintColor: activeTintColor,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
```

---

## 5. Screens

### Home: `app/(tabs)/index.tsx`
```tsx
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useNotes } from "../../src/context/NotesContext";
import { useTheme } from "../../src/context/ThemeContext";
import SearchBar from "../../src/components/SearchBar";
import NotesList from "../../src/components/NotesList";

export default function HomeScreen() {
  const { notes } = useNotes();
  const [query, setQuery] = useState("");
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";

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
```

### Settings: `app/(tabs)/settings.tsx`
```tsx
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
```

### Note Detail: `app/note/[id].tsx`
```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { useNotes } from "../../src/context/NotesContext";
import { useTheme } from "../../src/context/ThemeContext";

export default function NoteDetail() {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getNote, removeNote } = useNotes();
  const note = id ? getNote(String(id)) : undefined;

  if (!note) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.h1, { color: textColor }]}>Note not found.</Text>
        <Link href="/" style={{ color: textColor }}>Go Home</Link>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.h1, { color: textColor }]}>{note.title}</Text>
      <Text style={[styles.body, { color: textColor }]}>{note.body}</Text>

      <View style={styles.row}>
        <Link href="/" asChild>
          <Text style={styles.link}>Back</Text>
        </Link>

        <Link href="/" asChild>
          <Text
            style={styles.link}
            onPress={() => removeNote(note.id)}
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
```

### New Note: `app/note/new.tsx`
```tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useNotes } from "../../src/context/NotesContext";
import { useTheme } from "../../src/context/ThemeContext";

export default function NewNote() {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const inputBackgroundColor = isDarkMode ? "#1e1e1e" : "#f9f9f9";
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
        <Link href="/" style={{ color: textColor }} asChild>
          <Text style={[styles.btn, { color: textColor }]}>Cancel</Text>
        </Link>

        <Link href="/" style={{ color: textColor }} asChild>
          <Text
            style={[styles.btn, { color: textColor }]}
            onPress={() => {
              if (title.trim() || body.trim()) addNote(title.trim(), body.trim());
            }}
          >
            Save
          </Text>
        </Link>
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
```

---

## 6. Components

### types: `src/components/types.tsx`
```tsx
export type NoteItem = { id: string; title: string; body: string; createdAt: number };
```

### SearchBar: `src/components/SearchBar.tsx`
```tsx
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
```

### NoteCard: `src/components/NoteCard.tsx`
```tsx
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
```

### NotesList: `src/components/NotesList.tsx`
```tsx
import React from "react";
import { FlatList } from "react-native";
import NoteCard from "./NoteCard";
import type { NoteItem } from "./types";

export default function NotesList({ data }: { data: NoteItem[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(n) => n.id}
      renderItem={({ item }) => <NoteCard note={item} />}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}
```

---

## 7. Run the App

```bash
npx expo start -c
```
