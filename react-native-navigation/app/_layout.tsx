import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function RootLayout(){
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex:1}}>
                <Stack></Stack>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}