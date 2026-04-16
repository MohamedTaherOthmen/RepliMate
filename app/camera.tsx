import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ORANGE = "#FF6600";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torchEnabled, setTorchEnabled] = React.useState(false);

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ORANGE} />
        <Text style={styles.loadingText}>Demande de permission caméra...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>Accès caméra requis</Text>
        <Text style={styles.permissionText}>
          RepliMate a besoin d’accéder à la caméra pour scanner la pièce et le
          support de calibration ArUco.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={requestPermission}
        >
          <Text style={styles.primaryButtonText}>Autoriser la caméra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>← Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        enableTorch={torchEnabled}
      >
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backChip}
              onPress={() => router.back()}
            >
              <Text style={styles.backChipText}>← Retour</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.torchButton}
              onPress={() => setTorchEnabled((prev) => !prev)}
            >
              <Text style={styles.torchButtonText}>
                {torchEnabled ? "🔦 Torche ON" : "🔦 Torche OFF"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.centerArea}>
            <View style={styles.guideFrame}>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
            </View>

            <Text style={styles.guideText}>Placez l’objet dans le cadre</Text>
            <Text style={styles.subGuideText}>
              Alignez aussi le support de calibration ArUco
            </Text>
          </View>

          <View style={styles.bottomPanel}>
            <TouchableOpacity
              style={styles.calibrateButton}
              onPress={() =>
                Alert.alert(
                  "Calibration ArUco",
                  "Fonctionnalité en cours d’intégration.",
                )
              }
            >
              <Text style={styles.calibrateButtonText}>
                🔧 Calibrer avec ArUco
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: ORANGE,
    marginBottom: 12,
    textAlign: "center",
  },
  permissionText: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  topBar: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    gap: 12,
  },
  backChip: {
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  backChipText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  torchButton: {
    backgroundColor: "rgba(255, 102, 0, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  torchButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  centerArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  guideFrame: {
    width: "85%",
    aspectRatio: 1,
    position: "relative",
    marginBottom: 24,
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 42,
    height: 42,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: ORANGE,
    borderTopLeftRadius: 12,
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 42,
    height: 42,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: ORANGE,
    borderTopRightRadius: 12,
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 42,
    height: 42,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: ORANGE,
    borderBottomLeftRadius: 12,
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 42,
    height: 42,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: ORANGE,
    borderBottomRightRadius: 12,
  },
  guideText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  subGuideText: {
    color: "#f2f2f2",
    fontSize: 14,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bottomPanel: {
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  calibrateButton: {
    backgroundColor: ORANGE,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  calibrateButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  primaryButton: {
    backgroundColor: ORANGE,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 12,
    minWidth: 220,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#666",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    minWidth: 220,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
