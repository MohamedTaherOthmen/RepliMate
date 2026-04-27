import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function GuideScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.emoji}> 📖 </Text>{" "}
      <Text style={styles.title}> Guide d 'utilisation</Text>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}> 1 </Text>{" "}
        </View>{" "}
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}> Imprimer le PDF </Text>{" "}
          <Text style={styles.stepText}>
            {" "}
            Téléchargez et imprimez le PDF de calibration ArUco{" "}
          </Text>{" "}
        </View>{" "}
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}> 2 </Text>{" "}
        </View>{" "}
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}> Placer la feuille </Text>{" "}
          <Text style={styles.stepText}>
            {" "}
            Placez la feuille imprimée sous votre pièce{" "}
          </Text>{" "}
        </View>{" "}
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}> 3 </Text>{" "}
        </View>{" "}
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}> Scanner </Text>{" "}
          <Text style={styles.stepText}>
            {" "}
            Utilisez l 'appareil photo pour scanner la pièce
          </Text>{" "}
        </View>{" "}
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}> 4 </Text>{" "}
        </View>{" "}
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}> Détection </Text>{" "}
          <Text style={styles.stepText}>
            {" "}
            Attendez la détection automatique des contours{" "}
          </Text>{" "}
        </View>{" "}
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}> 5 </Text>{" "}
        </View>{" "}
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}> Modifier </Text>{" "}
          <Text style={styles.stepText}>
            {" "}
            Ajustez les points si nécessaire{" "}
          </Text>{" "}
        </View>{" "}
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}> 6 </Text>{" "}
        </View>{" "}
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}> Exporter </Text>{" "}
          <Text style={styles.stepText}> Téléchargez le fichier DXF </Text>{" "}
        </View>{" "}
      </View>{" "}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  emoji: {
    fontSize: 50,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6600",
    textAlign: "center",
    marginBottom: 30,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
  },
  stepNumber: {
    width: 40,
    height: 40,
    backgroundColor: "#FF6600",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumberText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  stepText: {
    fontSize: 14,
    color: "#666",
  },
});
