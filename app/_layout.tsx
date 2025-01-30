import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useColorScheme } from "react-native";
import { AuthProvider } from "../context/auth-context";
import "../global.css";

// Splash screen'i font yüklenene kadar göster
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Ubuntu: require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modals/subscription"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
