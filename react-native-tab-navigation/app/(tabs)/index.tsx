import { View, Text, Pressable, Button} from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../../context/ThemeContext";


export default function Home() {
  const { isDarkMode } = useTheme();
  const bg = isDarkMode ? "#000" : "#fff";
  const text = isDarkMode ? "#fff" : "#000";

  return (
    <>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: bg }}>
      <Text style={{ color: text }}>🏠 Home Tab</Text>
      <Link href="/(settings)/general" asChild>
          <Pressable>
            <Text style={{ color: text, marginTop: 10 }}>Go to Settings</Text>
          </Pressable>
        </Link>

    </View>
    </>

  );
}