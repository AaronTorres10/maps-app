import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import PermissionsCheckerProvider from "../../presentation/store/providers/PermissionsCheckerProvider";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PermissionsCheckerProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="loading/index" options={{ animation: "none" }} />

          <Stack.Screen name="map/index" options={{ animation: "fade" }} />

          <Stack.Screen
            name="permissions/index"
            options={{ animation: "fade" }}
          />
        </Stack>
      </PermissionsCheckerProvider>
    </ThemeProvider>
  );
}
