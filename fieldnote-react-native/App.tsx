import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import SearchBar from './src/components/SearchBar';
import NotesList from './src/components/NotesList';

export default function App() {
  const [notes, setNotes] = useState([
    { id: Date.now(), title: 'Trailhead observation', body: 'New signage at the kiosk.' },
  ]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [query, setQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const visible = notes.filter((n) => {
    const q = query.trim().toLowerCase();
    return !q || (n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q));
  });

  const addNote = () => {
    if (!title.trim() || !body.trim()) return;
    setSaving(true);
    setTimeout(() => {
      setNotes(prev => [
        { id: Date.now(), title: title.trim(), body: body.trim() },
        ...prev,
      ]);
      setTitle('');
      setBody('');
      setSaving(false);
    }, 300); 
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.h1}>FieldNotes</Text>
          <Text style={styles.tagline}>A simple place to log outdoor observations: plants, weather, trails, anything you notice.</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Type a title)"
            />
            <TextInput
              style={[styles.input, styles.multiline]}
              value={body}
              onChangeText={setBody}
              placeholder="Observations, GPS, conditions…"
              multiline
            />
            <Pressable style={[styles.button, saving && styles.buttonDisabled]} onPress={addNote} disabled={saving}>
              <Text style={styles.buttonText}>{saving ? 'Saving…' : 'Add note'}</Text>
            </Pressable>
          </View>
          
          <SearchBar onSearch={setQuery} />
          <NotesList notes={visible} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  tagline: { marginBottom: 12 },
  form: { gap: 8, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, fontSize: 16 },
  multiline: { minHeight: 100 },
  button: { backgroundColor: '#111', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '800' },
});