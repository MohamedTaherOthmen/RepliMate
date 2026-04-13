import { Stack } from "expo-router";

export default function RootLayout() {
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
      <Stack.Screen name="camera" options={{ title: "Scanner" }} />
      <Stack.Screen name="history" options={{ title: "Historique" }} />
      <Stack.Screen name="guide" options={{ title: "Guide" }} />
      <Stack.Screen name="editor" options={{ title: "Éditeur DXF" }} />
    </Stack>
  );
}
