import { FlatList,  Text } from 'react-native';
import NoteCard from './NoteCard';
import {Note} from './types'

export default function NotesList({ notes }: {notes: Note[]}) {
  if (!notes.length) {
    return <Text style={{ opacity: 0.7 }}>No notes match.</Text>;
  }

  return (
    <FlatList
      data={notes}
      keyExtractor={(n) => String(n.id)}
      contentContainerStyle={{ gap: 10, paddingBottom: 40 }}
      renderItem={({ item }) => (
        <NoteCard title={item.title} body={item.body} id={item.id} />
      )}
    />
  );
}