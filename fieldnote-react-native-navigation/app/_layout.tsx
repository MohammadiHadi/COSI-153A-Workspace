import { Stack } from "expo-router";
import { NotesProvider } from "../src/context/NotesContext";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext";

export default function RootLayout() {

  return (
    <NotesProvider>
      <ThemeProvider>
        <ThemedNotesRootLayout />
      </ThemeProvider>
    </NotesProvider>
  );
}

function ThemedNotesRootLayout() {
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? "#121212" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: bgColor },
      headerTitleStyle: { color: textColor },
      headerTintColor: textColor,
    }}>
      <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="note" options={{ title: "Home", headerShown: true }} />
      <Stack.Screen name="note/[id]" options={{ title: "Note" }} />
      <Stack.Screen name="note/new" options={{ title: "New Note" }} />
    </Stack>
  );
}