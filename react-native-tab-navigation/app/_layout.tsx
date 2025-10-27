// app/_layout.tsx
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { useTheme } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedRootLayout />
    </ThemeProvider>
  );
}

function ThemedRootLayout() {
  const { isDarkMode } = useTheme();
  return (
      <Stack screenOptions={{
        headerStyle: { backgroundColor: isDarkMode ? "#000" : "#fff",},
        headerTitleStyle: { color: isDarkMode ? "#fff" : "#000",},
      }}
>
        <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="(settings)" options={{ presentation: "modal", title: "Settings", headerShown: true }} />
      </Stack>
  );
}
