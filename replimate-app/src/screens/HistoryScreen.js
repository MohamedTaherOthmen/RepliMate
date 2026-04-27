import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HistoryScreen({ navigation }) {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("detections");
      if (history) {
        setDetections(JSON.parse(history));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (item) => {
    navigation.navigate("Editor", {
      scale: item.scale,
      angle: item.angle,
      points: item.points,
    });
  };

  const handleDelete = (id) => {
    Alert.alert("Supprimer", "Voulez-vous supprimer cette détection ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          const newDetections = detections.filter((item) => item.id !== id);
          setDetections(newDetections);
          await AsyncStorage.setItem(
            "detections",
            JSON.stringify(newDetections),
          );
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}> 📸{item.name} </Text>{" "}
        <Text style={styles.cardDate}> 📅{item.date} </Text>{" "}
        <Text style={styles.cardInfo}>
          {" "}
          📏 Échelle: {item.scale}
          mm / px{" "}
        </Text>{" "}
      </View>{" "}
      <View style={styles.cardButtons}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => handleView(item)}
        >
          <Text style={styles.viewButtonText}> 👁️View </Text>{" "}
        </TouchableOpacity>{" "}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}> 🗑️Delete </Text>{" "}
        </TouchableOpacity>{" "}
      </View>{" "}
    </View>
  );

  return (
    <View style={styles.container}>
      {" "}
      {detections.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emoji}> 📁 </Text>{" "}
          <Text style={styles.emptyTitle}> Aucune détection </Text>{" "}
          <Text style={styles.emptyText}>
            {" "}
            Commencez par scanner une pièce{" "}
          </Text>{" "}
        </View>
      ) : (
        <FlatList
          data={detections}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}{" "}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
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
    marginBottom: 3,
  },
  cardInfo: {
    fontSize: 12,
    color: "#FF6600",
  },
  cardButtons: {
    flexDirection: "row",
  },
  viewButton: {
    backgroundColor: "#FF6600",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
