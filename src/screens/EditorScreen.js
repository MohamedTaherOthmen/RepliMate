import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function EditorScreen({ route, navigation }) {
  const {
    scale,
    angle,
    points: initialPoints,
  } = route.params || {
    scale: 0.25,
    angle: 0,
    points: [
      [100, 100],
      [300, 100],
      [300, 300],
      [100, 300],
    ],
  };

  const [points, setPoints] = useState(initialPoints);
  const [selectedTool, setSelectedTool] = useState("move");

  const handleDownload = async () => {
    // Sauvegarder dans l'historique
    const newDetection = {
      id: Date.now().toString(),
      name: `Pièce ${new Date().toLocaleDateString()}`,
      date: new Date().toLocaleString(),
      scale: scale,
      angle: angle,
      points: points,
    };

    try {
      const history = await AsyncStorage.getItem("detections");
      const detections = history ? JSON.parse(history) : [];
      detections.unshift(newDetection);
      await AsyncStorage.setItem("detections", JSON.stringify(detections));

      Alert.alert("Succès", "Fichier DXF généré et sauvegardé !", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sauvegarder");
    }
  };

  return (
    <View style={styles.container}>
      {" "}
      {/* Zone d'aperçu */}{" "}
      <View style={styles.previewContainer}>
        <View style={styles.previewBox}>
          <Text style={styles.previewEmoji}> 🖼️ </Text>{" "}
          <Text style={styles.previewText}> Aperçu DXF </Text>{" "}
          <View style={styles.canvasPreview}>
            {" "}
            {points.map((point, index) => (
              <View
                key={index}
                style={[
                  styles.previewPoint,
                  { left: point[0] / 4, top: point[1] / 4 },
                ]}
              />
            ))}{" "}
          </View>{" "}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            {" "}
            📏Échelle: {scale}
            mm / px{" "}
          </Text>{" "}
          <Text style={styles.infoText}> 📐Angle: {angle}° </Text>{" "}
          <Text style={styles.infoText}> 📍Points: {points.length} </Text>{" "}
        </View>{" "}
      </View>
      {/* Outils d'édition */}{" "}
      <View style={styles.toolsContainer}>
        <Text style={styles.toolsTitle}> ✏️Outils d 'édition</Text>
        <View style={styles.toolsRow}>
          <TouchableOpacity
            style={[
              styles.toolButton,
              selectedTool === "move" && styles.toolActive,
            ]}
            onPress={() => setSelectedTool("move")}
          >
            <Text style={styles.toolText}> ✋Déplacer </Text>{" "}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toolButton,
              selectedTool === "add" && styles.toolActive,
            ]}
            onPress={() => setSelectedTool("add")}
          >
            <Text style={styles.toolText}> ➕Ajouter </Text>{" "}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toolButton,
              selectedTool === "delete" && styles.toolActive,
            ]}
            onPress={() => setSelectedTool("delete")}
          >
            <Text style={styles.toolText}> 🗑️Supprimer </Text>{" "}
          </TouchableOpacity>{" "}
        </View>
        <View style={styles.zoomRow}>
          <TouchableOpacity style={styles.zoomButton}>
            <Text style={styles.zoomText}> 🔍Zoom + </Text>{" "}
          </TouchableOpacity>{" "}
          <TouchableOpacity style={styles.zoomButton}>
            <Text style={styles.zoomText}> 🔍Zoom - </Text>{" "}
          </TouchableOpacity>{" "}
          <TouchableOpacity style={styles.zoomButton}>
            <Text style={styles.zoomText}> 🔄Reset </Text>{" "}
          </TouchableOpacity>{" "}
        </View>{" "}
      </View>
      {/* Bouton Done */}{" "}
      <TouchableOpacity style={styles.doneButton} onPress={handleDownload}>
        <Text style={styles.doneButtonText}>
          {" "}
          ✅Done - Télécharger DXF{" "}
        </Text>{" "}
      </TouchableOpacity>{" "}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  previewContainer: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewBox: {
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  previewEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  previewText: {
    fontSize: 14,
    color: "#999",
  },
  canvasPreview: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  previewPoint: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "#FF6600",
    borderRadius: 4,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
  },
  toolsContainer: {
    backgroundColor: "#fff",
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  toolsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  toolButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
  },
  toolActive: {
    backgroundColor: "#FF6600",
  },
  toolText: {
    fontSize: 14,
    color: "#333",
  },
  zoomRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  zoomButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  zoomText: {
    fontSize: 12,
    color: "#666",
  },
  doneButton: {
    backgroundColor: "#FF6600",
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
