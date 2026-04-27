import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { saveDetection, getDetections } from "./storage";

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
  };

  const handleTestDatabase = async () => {
    try {
      const saved = await saveDetection({
        name: "Test DB",
        scale: 0.25,
        angle: 0,
        points: [
          [100, 100],
          [200, 100],
          [200, 200],
          [100, 200],
        ],
        dxfData: "TEST_DXF_CONTENT",
      });

      const all = await getDetections();

      console.log("Saved:", saved);
      console.log("All detections:", all);

      Alert.alert(
        "Test DB réussi",
        `Base OK : ${all.length} enregistrement(s). Vérifie maintenant l'écran Historique.`
      );
    } catch (error: any) {
      Alert.alert("Erreur DB", error.message || "Test base échoué");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RepliMate</Text>
      <Text style={styles.subtitle}>Image → DXF Converter</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/camera")}
      >
        <Text style={styles.buttonText}>📸 Scanner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.historyButton]}
        onPress={() => router.push("/history")}
      >
        <Text style={styles.buttonText}>📁 Historique</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.guideButton]}
        onPress={() => router.push("/guide")}
      >
        <Text style={styles.buttonText}>📖 Guide</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.testDbButton]}
        onPress={handleTestDatabase}
      >
        <Text style={styles.buttonText}>🧪 Tester la base</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.passwordButton]}
        onPress={() => router.push("/change-password")}
      >
        <Text style={styles.buttonText}>🔒 Modifier mot de passe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>🚪 Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Orange Fab Lab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FF6600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF6600",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  historyButton: {
    backgroundColor: "#2196F3",
  },
  guideButton: {
    backgroundColor: "#4CAF50",
  },
  testDbButton: {
    backgroundColor: "#673AB7",
  },
  passwordButton: {
    backgroundColor: "#9C27B0",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    color: "#999",
    fontSize: 12,
  },
});
