// app/(settings)/general.tsx
import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>⚙️ Settings</Text>
      <Link href="/(settings)/notifications">Notifications</Link>
      <Link href="/(settings)/privacy">Privacy</Link>
    </View>
  );
}
