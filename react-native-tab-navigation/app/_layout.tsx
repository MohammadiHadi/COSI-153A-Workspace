// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: true }} />
      <Stack.Screen name="(settings)" options={{headerShown: false}}/>
    </Stack>
  );
}
// app/(tabs)/_layout.tsx