import { View, Text , StyleSheet} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProfileScreen(){
const params = useLocalSearchParams();
const {id, name} = params;
return (
    <View style={styles.container}>
        <Text>This is {name}'s profile page with id: {id}</Text>
    </View>
)
}

const styles = StyleSheet.create({
container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 8 },
});
