import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function CourseScreen() {
const { name } = useLocalSearchParams<{ name?: string }>();

return (
    <>
    <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>Hello, Class!</Text>
        < Text>{name ? `Welcome to ${name}!` : ""}</Text>
    </View>
    </>
);}



const styles = StyleSheet.create({
container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 8 },
});
