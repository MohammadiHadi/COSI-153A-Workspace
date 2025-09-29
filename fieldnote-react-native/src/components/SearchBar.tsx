import { TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ onSearch }) {
  return (
    <TextInput
      style={styles.search}
      placeholder="Search notes…"
      onChangeText={onSearch}
      clearButtonMode="while-editing"
    />
  );
}

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    fontSize: 16,
  },
});