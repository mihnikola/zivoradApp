// /app/layout/RootLayout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ReservationProvider } from "@/context/ReservationContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReservationProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="menuservices" options={{ title: "" }} />
          <Stack.Screen name="datereservation" options={{ title: "" }} />
          <Stack.Screen name="reservation" options={{ title: "" }} />
          <Stack.Screen name="makereservation" options={{  headerShown: false  }} />
          <Stack.Screen name="userprofile" options={{ title: "" }} />
          <Stack.Screen name="notifications" options={{ title: "" }} />
          <Stack.Screen name="usecase" options={{ title: "" }} />
          <Stack.Screen name="aboutapplication" options={{ title: "" }} />
          <Stack.Screen name="login" options={{ title: "" }} />
          <Stack.Screen name="register" options={{ title: "",headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      </ReservationProvider>
  );
}
