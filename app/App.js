import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Écran de connexion
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}> RepliMate </Text>{" "}
      <Text style={styles.subtitle}> Image→ DXF Converter </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}> Se connecter </Text>{" "}
      </TouchableOpacity>
      <Text style={styles.footer}> Orange Fab Lab </Text>{" "}
    </View>
  );
}

// Écran caméra
function CameraScreen({ onBack }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCalibrating(false);
          Alert.alert("Succès", "Calibration terminée !");
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6600" />
        <Text style={styles.text}> Demande de permission... </Text>{" "}
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Permission caméra requise </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}> Autoriser la caméra </Text>{" "}
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}> Retour </Text>{" "}
        </TouchableOpacity>{" "}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.cameraOverlay}>
          <View style={styles.guideFrame}>
            <View style={styles.cornerTL} /> <View style={styles.cornerTR} />{" "}
            <View style={styles.cornerBL} /> <View style={styles.cornerBR} />{" "}
            <Text style={styles.guideText}>
              {" "}
              Placez l 'objet dans le cadre
            </Text>{" "}
          </View>
          {isCalibrating && (
            <View style={styles.loadingOverlay}>
              <Text style={styles.loadingText}>
                {" "}
                Please wait for calibration...{" "}
              </Text>{" "}
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />{" "}
              </View>{" "}
            </View>
          )}{" "}
        </View>{" "}
      </CameraView>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.calibrateButton}
          onPress={handleCalibrate}
        >
          <Text style={styles.buttonText}> 🔧Calibrer avec ArUco </Text>{" "}
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}> ←Retour </Text>{" "}
        </TouchableOpacity>{" "}
      </View>{" "}
    </View>
  );
}

// Menu principal
function MainMenu({
  onOpenCamera,
  onOpenHistory,
  onOpenGuide,
  onOpenRegulations,
  onLogout,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> RepliMate </Text>{" "}
      <Text style={styles.subtitle}> Image→ DXF Converter </Text>
      <TouchableOpacity style={styles.button} onPress={onOpenCamera}>
        <Text style={styles.buttonText}> 📸Scanner </Text>{" "}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.historyButton]}
        onPress={onOpenHistory}
      >
        <Text style={styles.buttonText}> 📁Historique </Text>{" "}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.guideButton]}
        onPress={onOpenGuide}
      >
        <Text style={styles.buttonText}> 📖Guide </Text>{" "}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.regulationsButton]}
        onPress={onOpenRegulations}
      >
        <Text style={styles.buttonText}> ⚖️Règlement </Text>{" "}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={onLogout}
      >
        <Text style={styles.buttonText}> 🚪Logout </Text>{" "}
      </TouchableOpacity>
      <Text style={styles.footer}> Orange Fab Lab </Text>{" "}
    </View>
  );
}

// Écran Historique
function HistoryScreen({ onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> 📁Historique </Text>{" "}
      <Text style={styles.subtitle}> Aucune détection pour le moment </Text>{" "}
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}> ←Retour </Text>{" "}
      </TouchableOpacity>{" "}
    </View>
  );
}

// Écran Guide
function GuideScreen({ onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> 📖Guide </Text>{" "}
      <Text style={styles.subtitle}> 1. Imprimez le PDF ArUco </Text>{" "}
      <Text style={styles.subtitle}> 2. Placez sous la pièce </Text>{" "}
      <Text style={styles.subtitle}> 3. Scannez avec la caméra </Text>{" "}
      <Text style={styles.subtitle}> 4. Calibration automatique </Text>{" "}
      <Text style={styles.subtitle}> 5. Exportez le fichier DXF </Text>{" "}
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}> ←Retour </Text>{" "}
      </TouchableOpacity>{" "}
    </View>
  );
}

// Écran Règlement
function RegulationsScreen({ onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> ⚖️Règlement </Text>{" "}
      <Text style={styles.subtitle}> Version 1.0 .0 </Text>{" "}
      <Text style={styles.subtitle}>
        {" "}
        Application développée pour les FabLabs{" "}
      </Text>{" "}
      <Text style={styles.subtitle}> Orange Fab Lab© 2025 </Text>{" "}
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}> ←Retour </Text>{" "}
      </TouchableOpacity>{" "}
    </View>
  );
}

// Application principale
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");

  if (currentScreen === "login") {
    return <LoginScreen onLogin={() => setCurrentScreen("menu")} />;
  }

  if (currentScreen === "camera") {
    return <CameraScreen onBack={() => setCurrentScreen("menu")} />;
  }

  if (currentScreen === "history") {
    return <HistoryScreen onBack={() => setCurrentScreen("menu")} />;
  }

  if (currentScreen === "guide") {
    return <GuideScreen onBack={() => setCurrentScreen("menu")} />;
  }

  if (currentScreen === "regulations") {
    return <RegulationsScreen onBack={() => setCurrentScreen("menu")} />;
  }

  return (
    <MainMenu
      onOpenCamera={() => setCurrentScreen("camera")}
      onOpenHistory={() => setCurrentScreen("history")}
      onOpenGuide={() => setCurrentScreen("guide")}
      onOpenRegulations={() => setCurrentScreen("regulations")}
      onLogout={() => setCurrentScreen("login")}
    />
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
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
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
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  historyButton: {
    backgroundColor: "#2196F3",
  },
  guideButton: {
    backgroundColor: "#4CAF50",
  },
  regulationsButton: {
    backgroundColor: "#9C27B0",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    marginTop: 30,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    color: "#999",
    fontSize: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
    marginBottom: 10,
  },
  guideFrame: {
    position: "absolute",
    top: "20%",
    left: "10%",
    right: "10%",
    bottom: "25%",
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#FF6600",
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#FF6600",
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#FF6600",
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#FF6600",
  },
  guideText: {
    position: "absolute",
    bottom: -35,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
  },
  loadingOverlay: {
    position: "absolute",
    top: "35%",
    left: "15%",
    right: "15%",
    backgroundColor: "rgba(0,0,0,0.9)",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginBottom: 15,
    fontSize: 16,
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6600",
    borderRadius: 2,
  },
  controls: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  calibrateButton: {
    backgroundColor: "#FF6600",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#666",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
