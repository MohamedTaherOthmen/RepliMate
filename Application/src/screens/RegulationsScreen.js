import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function RegulationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.emoji}> ⚖️ </Text>{" "}
      <Text style={styles.title}> Règlement </Text>{" "}
      <Text style={styles.version}> Version 1.0 .0 </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Conditions d 'utilisation</Text>{" "}
        <Text style={styles.sectionText}>
          Cette application est développée dans le cadre du projet RepliMate
          pour les FabLabs.Elle permet la conversion d 'images 2D en fichiers
          DXF pour la fabrication numérique.{" "}
        </Text>{" "}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Licence </Text>{" "}
        <Text style={styles.sectionText}>Open Source - MIT License </Text>{" "}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Politique de confidentialité </Text>{" "}
        <Text style={styles.sectionText}>
          Les images et fichiers DXF sont stockés localement sur votre
          appareil.Aucune donnée n 'est envoyée à des serveurs externes sans
          votre consentement.{" "}
        </Text>{" "}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Contact </Text>{" "}
        <Text style={styles.sectionText}>Orange Fab Lab </Text>{" "}
      </View>
      <Text style={styles.footer}> ©2025 - Tous droits réservés </Text>{" "}
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6600",
    textAlign: "center",
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6600",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  footer: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 30,
    marginBottom: 40,
  },
});
