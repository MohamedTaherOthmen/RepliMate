import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { saveDetection } from "./storage";

export default function EditorScreen() {
  const params = useLocalSearchParams<{
    detectionId?: string;
    dxfData?: string;
    scale?: string;
    angle?: string;
    points?: string;
  }>();

  const [points, setPoints] = useState<number[][]>([
    [100, 100],
    [300, 100],
    [300, 300],
    [100, 300],
  ]);
  const [scale, setScale] = useState(0.25);
  const [angle, setAngle] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (params.points) {
      try {
        const parsed = JSON.parse(params.points);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          setPoints(parsed);
        }
      } catch {}
    }

    if (params.scale) {
      const parsedScale = Number(params.scale);
      if (!Number.isNaN(parsedScale)) setScale(parsedScale);
    }

    if (params.angle) {
      const parsedAngle = Number(params.angle);
      if (!Number.isNaN(parsedAngle)) setAngle(parsedAngle);
    }
  }, [params.points, params.scale, params.angle]);

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

      const detection = {
        name: `Pièce ${new Date().toLocaleDateString()}`,
        scale,
        angle,
        points,
        dxfData: dxfContent,
      };

      await saveDetection(detection);

      await Share.share({
        title: "Export DXF RepliMate",
        message: "Fichier DXF généré avec succès",
        url: `data:text/plain;base64,${Buffer.from(dxfContent).toString("base64")}`,
      });

      Alert.alert("Succès", "Fichier DXF exporté et sauvegardé !");
      router.back();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'exporter le fichier");
    } finally {
      setIsExporting(false);
    }
  };

  const addPoint = () => {
    const newPoint: [number, number] = [250, 250];
    setPoints([...points, newPoint]);
  };

  const removeLastPoint = () => {
    if (points.length > 3) {
      setPoints(points.slice(0, -1));
    } else {
      Alert.alert("Info", "Un polygone doit avoir au moins 3 points");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Aperçu DXF</Text>

        <View style={styles.canvas}>
          {points.map((point, index) => (
            <View
              key={`point-${index}`}
              style={[
                styles.point,
                {
                  left: point[0] / 2.5,
                  top: point[1] / 2.5,
                },
              ]}
            />
          ))}

          {points.map((point, index) => {
            const nextPoint = points[(index + 1) % points.length];
            const width = Math.hypot(nextPoint[0] - point[0], nextPoint[1] - point[1]) / 2.5;
            const angleDeg =
              (Math.atan2(nextPoint[1] - point[1], nextPoint[0] - point[0]) * 180) / Math.PI;

            return (
              <View
                key={`line-${index}`}
                style={[
                  styles.line,
                  {
                    left: point[0] / 2.5,
                    top: point[1] / 2.5,
                    width,
                    transform: [{ rotate: `${angleDeg}deg` }],
                  },
                ]}
              />
            );
          })}
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Échelle: {scale} mm/px</Text>
          <Text style={styles.infoText}>Angle: {angle}°</Text>
          <Text style={styles.infoText}>Points: {points.length}</Text>
        </View>
      </View>

      <View style={styles.toolsContainer}>
        <Text style={styles.toolsTitle}>Outils d'édition</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.toolButton} onPress={addPoint}>
            <Text style={styles.toolButtonText}>Ajouter point</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolButton, styles.removeButton]}
            onPress={removeLastPoint}
          >
            <Text style={styles.toolButtonText}>Supprimer point</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => setScale(scale + 0.01)}
          >
            <Text style={styles.toolButtonText}>Échelle +</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => setScale(Math.max(0.01, scale - 0.01))}
          >
            <Text style={styles.toolButtonText}>Échelle -</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.exportButton}
          onPress={handleExport}
          disabled={isExporting}
        >
          <Text style={styles.exportButtonText}>
            {isExporting ? "Export en cours..." : "Done - Exporter DXF"}
          </Text>
        </TouchableOpacity>
      </View>
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
    height: 200,
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
  line: {
    position: "absolute",
    height: 2,
    backgroundColor: "#2196F3",
    transformOrigin: "left center",
  },
  infoRow: {
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
  },
  toolButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  removeButton: {
    backgroundColor: "#ffebee",
  },
  toolButtonText: {
    fontSize: 14,
    color: "#333",
  },
  exportButton: {
    backgroundColor: "#FF6600",
    marginTop: 10,
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
