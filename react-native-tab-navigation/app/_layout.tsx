// app/_layout.tsx
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";


export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="(settings)" options={{ title: "Settings", headerShown: true }} />
      </Stack>
    </ThemeProvider>
  );
}
