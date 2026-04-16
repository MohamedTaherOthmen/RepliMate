import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { deleteDetection, getDetections } from "../storage";

type Detection = {
  id: string;
  name: string;
  date: string;
  scale?: number;
  angle?: number;
  points?: number[][];
  dxfData?: string;
};

export default function HistoryScreen() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadDetections = async () => {
    const data = await getDetections();
    setDetections(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadDetections();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDetections();
    setRefreshing(false);
  };

  const handleView = (item: Detection) => {
    router.push({
      pathname: "/editor",
      params: {
        detectionId: item.id,
        name: item.name,
        date: item.date,
        scale: String(item.scale ?? 0.25),
        angle: String(item.angle ?? 0),
        points: JSON.stringify(item.points ?? []),
        dxfData: item.dxfData ?? "",
      },
    });
  };

  const handleDelete = (item: Detection) => {
    Alert.alert("Supprimer", `Voulez-vous supprimer "${item.name}" ?`, [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          await deleteDetection(item.id);
          await loadDetections();
        },
      },
    ]);
  };

  if (detections.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📁</Text>
        <Text style={styles.emptyTitle}>Aucune détection</Text>
        <Text style={styles.emptyText}>Commencez par scanner une pièce</Text>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => router.push("/camera")}
        >
          <Text style={styles.scanButtonText}>📸 Scanner maintenant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={detections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>📸 {item.name}</Text>
              <Text style={styles.cardDate}>📅 {item.date}</Text>
              <View style={styles.cardInfoRow}>
                <Text style={styles.cardInfo}>
                  📏 Échelle: {item.scale ?? 0.25} mm/px
                </Text>
                <Text style={styles.cardInfo}>
                  📍 {item.points?.length ?? 0} points
                </Text>
              </View>
            </View>

            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleView(item)}
              >
                <Text style={styles.viewButtonText}>👁️ Voir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item)}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  cardInfoRow: {
    gap: 4,
  },
  cardInfo: {
    fontSize: 11,
    color: "#FF6600",
  },
  cardButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#FF6600",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 30,
  },
  scanButton: {
    backgroundColor: "#FF6600",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
