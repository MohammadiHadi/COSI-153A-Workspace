import { View, Text, Pressable} from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🏠 Home Tab</Text>
      <Link href="/(settings)/general" asChild>
          <Pressable>
            <Text style={{ color: 'blue', marginTop: 10 }}>Go to Settings</Text>
          </Pressable>
        </Link>

    </View>
  );
}