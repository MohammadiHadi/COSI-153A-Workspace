import { View, Text, StyleSheet } from 'react-native';

export default function NoteCard({ title, body, date }) {
  const d = new Date(date);
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.body} numberOfLines={2}>{body}</Text>
      <Text style={styles.date}>{d.toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, backgroundColor: '#fff' },
  title: { fontWeight: '700', fontSize: 16, marginBottom: 2 },
  body: { opacity: 0.8, fontSize: 14, marginBottom: 6 },
  date: { fontSize: 12, opacity: 0.6 },
});