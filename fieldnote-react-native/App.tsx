import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

 const notes = [
{ id: '1', title: 'Trailhead observation', body: 'New signage at the kiosk.' },
{ id: '2', title: 'Wildlife', body: 'Saw a red fox near the meadow.' },
{ id: '3', title: 'Weather', body: 'Sunny with scattered clouds.' },
];



export default function App() {
   const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.card}>
        <Text style={styles.title}>Trailhead observation</Text>
        <Text style={styles.body}>New signage at the kiosk.</Text>
      </View> */}
      {/* <View style={styles.card}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.sViewContent}>
          <Text style={styles.title}>{notes[0].title}</Text>
          <Text style={styles.body}>{notes[0].body}</Text>
                    <Text style={styles.title}>{notes[1].title}</Text>
          <Text style={styles.body}>{notes[1].body}</Text>
                    <Text style={styles.title}>{notes[2].title}</Text>
          <Text style={styles.body}>{notes[2].body}</Text>
        </ScrollView>
      </View> */}
       <View style={styles.card}>
        <FlatList data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  body: {
    fontSize: 16,
    color: '#555',
    lineHeight: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: '5%',
    margin: 4,
    borderRadius: 8,
    width: '85%',
  },
   sViewContent: {
    padding: 16
  },
  scrollView: { 
    height: 100, 
    backgroundColor: "lightgray" 
  }
});
