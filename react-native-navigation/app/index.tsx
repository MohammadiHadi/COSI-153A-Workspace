import { Link, Stack } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function HomeScreen() {
return (
    
    <View style={styles.container}>
        <Text style={styles.header}>Hello, World!</Text>

        {/* simple link to /course */}
        <Link href="/course" asChild>
            <Pressable style={styles.pressable}>
                <Text>Go to Course</Text>
            </Pressable>
        </Link>

        {/* link with a param: /course?name=CS153A */}
            <Link href={{ pathname: "/course", params: { name: "CS153A"} }} asChild>
            <Pressable style={styles.pressable}>
            <Text>Go to Course (with name)</Text>
            </Pressable>
            </Link>

    </View>
)}

const styles = StyleSheet.create({
container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
header: { fontSize: 20, fontWeight: "600" },
pressable: { paddingHorizontal: 16, paddingVertical: 10, borderWidth: 1, borderRadius: 8 },
});

