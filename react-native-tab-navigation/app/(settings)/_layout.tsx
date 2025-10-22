
// app/(settings)/_layout.tsx
import { Stack } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsLayout() {
  const { isDarkMode } = useTheme();
  return (
    <Stack screenOptions={{
        headerStyle: { backgroundColor: isDarkMode ? "#000" : "#fff",},
        headerTitleStyle: { color: isDarkMode ? "#fff" : "#000",},
      }}
>
      <Stack.Screen name="general" options={{ title: "Settings", headerShown: false }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen name="privacy" options={{ title: "Privacy" }} />
    </Stack>
  );
}
