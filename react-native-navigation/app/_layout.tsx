import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function RootLayout(){
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex:1}}>
                <Stack screenOptions={{
                    headerStyle: { backgroundColor: '#f4511e' },
                    headerTintColor: '#080311',
                    headerTitleStyle: { fontWeight: 'heavy', color: 'black' }
                }}>
                    <Stack.Screen name="index" options={{ title: 'Home' }} />
                    <Stack.Screen name="course" options={{ title: 'Course' }} />
                    <Stack.Screen name="users/[id]" options={{ title: 'User Profile' }} />
                </Stack>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}