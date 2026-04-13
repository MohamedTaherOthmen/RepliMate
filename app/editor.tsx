import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { saveDetection } from "../storage";

type Point = [number, number];

export default function EditorScreen() {
  const params = useLocalSearchParams<{
    detectionId?: string;
    name?: string;
    date?: string;
    scale?: string;
    angle?: string;
    points?: string;
    dxfData?: string;
  }>();

  const initialPoints = useMemo<Point[]>(() => {
    try {
      const parsed = params.points ? JSON.parse(params.points) : null;
      if (Array.isArray(parsed) && parsed.length >= 3) {
        return parsed;
      }
    } catch {}
    return [
      [100, 100],
      [300, 100],
      [300, 300],
      [100, 300],
    ];
  }, [params.points]);

  const [points, setPoints] = useState<Point[]>(initialPoints);
  const [scale, setScale] = useState(Number(params.scale ?? 0.25));
  const [angle] = useState(Number(params.angle ?? 0));
  const [isExporting, setIsExporting] = useState(false);

  const generateDXF = () => {
    let dxfContent = `0
SECTION
2
HEADER
0
ENDSEC
0
SECTION
2
ENTITIES
`;

    points.forEach((point, index) => {
      const nextPoint = points[(index + 1) % points.length];
      dxfContent += `0
LINE
8
0
10
${point[0] * scale}
20
${point[1] * scale}
11
${nextPoint[0] * scale}
21
${nextPoint[1] * scale}
0
`;
    });

    dxfContent += `0
ENDSEC
0
EOF`;

    return dxfContent;
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const dxfContent = generateDXF();

      await saveDetection({
        name: params.name || `Pièce_${new Date().toLocaleDateString()}`,
        scale,
        angle,
        points,
        dxfData: dxfContent,
      });

      await Share.share({
        title: "Export DXF RepliMate",
        message: `DXF généré avec succès.\n\n${dxfContent.slice(0, 500)}...`,
      });

      Alert.alert("Succès", "Fichier DXF généré et sauvegardé.");
      router.back();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'exporter le fichier.");
    } finally {
      setIsExporting(false);
    }
  };

  const addPoint = () => {
    setPoints((prev) => [...prev, [250, 250]]);
  };

  const removeLastPoint = () => {
    if (points.length <= 3) {
      Alert.alert("Info", "Un polygone doit avoir au moins 3 points.");
      return;
    }
    setPoints((prev) => prev.slice(0, -1));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>📐 Aperçu DXF</Text>

        <View style={styles.canvas}>
          {points.map((point, index) => (
            <View
              key={`point-${index}`}
              style={[styles.point, { left: point[0] / 2, top: point[1] / 2 }]}
            />
          ))}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            📏 Échelle: {scale.toFixed(2)} mm/px
          </Text>
          <Text style={styles.infoText}>📐 Angle: {angle}°</Text>
          <Text style={styles.infoText}>📍 Points: {points.length}</Text>
        </View>
      </View>

      <View style={styles.toolsContainer}>
        <Text style={styles.toolsTitle}>✏️ Outils d’édition</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.toolButton} onPress={addPoint}>
            <Text style={styles.toolButtonText}>➕ Ajouter point</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolButton, styles.removeButton]}
            onPress={removeLastPoint}
          >
            <Text style={styles.toolButtonText}>➖ Supprimer point</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => setScale((prev) => +(prev + 0.01).toFixed(2))}
          >
            <Text style={styles.toolButtonText}>📏 Échelle +</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toolButton}
            onPress={() =>
              setScale((prev) => +Math.max(0.01, prev - 0.01).toFixed(2))
            }
          >
            <Text style={styles.toolButtonText}>📏 Échelle -</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.exportButton}
        onPress={handleExport}
        disabled={isExporting}
      >
        <Text style={styles.exportButtonText}>
          {isExporting ? "⏳ Export en cours..." : "✅ Done - Exporter DXF"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  canvas: {
    height: 220,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
  point: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "#FF6600",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  infoRow: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    gap: 6,
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
  },
  toolsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  toolButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "#ffebee",
  },
  toolButtonText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  exportButton: {
    backgroundColor: "#FF6600",
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  exportButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
