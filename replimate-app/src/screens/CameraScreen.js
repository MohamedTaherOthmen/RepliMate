import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from "react-native";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCalibrate = async () => {
    setIsCalibrating(true);
    setCalibrationProgress(0);

    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCalibrationProgress(i);
    }

    setIsCalibrating(false);
    Vibration.vibrate(500);
    Alert.alert("Succès", "Calibration terminée !", [
      { text: "Démarrer détection", onPress: startDetection },
    ]);
  };

  const startDetection = () => {
    setIsDetecting(true);

    setTimeout(async () => {
      setIsDetecting(false);
      Vibration.vibrate(500);

      navigation.navigate("Editor", {
        imageUri: null,
        scale: 0.25,
        angle: 2.3,
        points: [
          [100, 100],
          [300, 100],
          [300, 300],
          [100, 300],
        ],
      });
    }, 2000);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          {" "}
          Demande de permission...{" "}
        </Text>{" "}
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}> Permission caméra refusée </Text>{" "}
        <TouchableOpacity
          onPress={() => Camera.requestCameraPermissionsAsync()}
        >
          <Text style={styles.retryText}> Réessayer </Text>{" "}
        </TouchableOpacity>{" "}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={CameraType.back}>
        <View style={styles.overlay}>
          <View style={styles.guideFrame}>
            <View style={styles.cornerTL} /> <View style={styles.cornerTR} />{" "}
            <View style={styles.cornerBL} /> <View style={styles.cornerBR} />{" "}
            <Text style={styles.guideText}>
              {" "}
              Placez l 'objet dans le cadre
            </Text>{" "}
          </View>
          {(isCalibrating || isDetecting) && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#FF6600" />
              <Text style={styles.loadingText}>
                {" "}
                {isCalibrating
                  ? "Please wait for calibration..."
                  : "Detecting..."}{" "}
              </Text>{" "}
              {isCalibrating && (
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${calibrationProgress}%` },
                    ]}
                  />{" "}
                </View>
              )}{" "}
            </View>
          )}{" "}
        </View>{" "}
      </Camera>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.calibrateButton}
          onPress={handleCalibrate}
        >
          <Text style={styles.buttonText}> 🔧Calibrer avec ArUco </Text>{" "}
        </TouchableOpacity>{" "}
      </View>{" "}
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
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  guideFrame: {
    position: "absolute",
    top: "20%",
    left: "10%",
    right: "10%",
    bottom: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#FF6600",
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#FF6600",
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#FF6600",
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#FF6600",
  },
  guideText: {
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  loadingOverlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.85)",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
  },
  loadingText: {
    color: "#fff",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    marginTop: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6600",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  permissionText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
  },
  retryText: {
    color: "#FF6600",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
