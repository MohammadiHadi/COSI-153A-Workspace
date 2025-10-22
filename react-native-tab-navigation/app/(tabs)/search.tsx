import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Search() {
  const { isDarkMode } = useTheme();
  const bg = isDarkMode ? "#000" : "#fff";
  const text = isDarkMode ? "#fff" : "#000";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: bg }}>
      <Text style={{ color: text }}>🔍 Search Tab</Text>
    </View>
  );
}
