import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDatabase } from "./database";

export default function RootLayout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#FF6600" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "RepliMate", headerShown: false }}
      />
      <Stack.Screen
        name="home"
        options={{ title: "Accueil", headerShown: false }}
      />
      <Stack.Screen name="camera" options={{ title: "Scanner" }} />
      <Stack.Screen name="history" options={{ title: "Historique" }} />
      <Stack.Screen name="guide" options={{ title: "Guide" }} />
      <Stack.Screen name="editor" options={{ title: "Éditeur DXF" }} />
      <Stack.Screen
        name="forgot-password"
        options={{ title: "Mot de passe oublié" }}
      />
      <Stack.Screen
        name="change-password"
        options={{ title: "Modifier mot de passe" }}
      />
    </Stack>
  );
}
