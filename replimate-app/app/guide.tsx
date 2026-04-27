import React from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const steps = [
  {
    number: "1",
    title: "Imprimer le PDF de calibration",
    description:
      "Téléchargez et imprimez le PDF contenant les 4 marqueurs ArUco.",
    icon: "🖨️",
  },
  {
    number: "2",
    title: "Placer la feuille sous la pièce",
    description:
      "Placez la feuille imprimée sur une surface plane, puis posez votre pièce dessus.",
    icon: "📄",
  },
  {
    number: "3",
    title: "Lancer la calibration",
    description: "Dans l’onglet Scanner, appuyez sur “Calibrer avec ArUco”.",
    icon: "🔧",
  },
  {
    number: "4",
    title: "Attendre la détection",
    description:
      "L’application détecte automatiquement les marqueurs et calcule l’échelle.",
    icon: "⏳",
  },
  {
    number: "5",
    title: "Vérifier et modifier",
    description:
      "Visualisez les contours détectés et ajustez les points si nécessaire.",
    icon: "✏️",
  },
  {
    number: "6",
    title: "Exporter en DXF",
    description: "Appuyez sur “Done” pour générer et partager le fichier DXF.",
    icon: "📥",
  },
];

const tips = [
  "📸 Utilisez un bon éclairage pour une meilleure détection.",
  "📏 Assurez-vous que les 4 marqueurs sont visibles.",
  "🎯 Placez la pièce au centre du cadre.",
  "💾 Les détections sont automatiquement sauvegardées.",
];

export default function GuideScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>📖</Text>
        <Text style={styles.headerTitle}>Guide d’utilisation</Text>
        <Text style={styles.headerSubtitle}>RepliMate - Image to DXF</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Étapes à suivre</Text>
        {steps.map((step) => (
          <View key={step.number} style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step.number}</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepHeader}>
                <Text style={styles.stepIcon}>{step.icon}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </View>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Conseils</Text>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>❓ FAQ</Text>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>
            Q: Quels formats d'image sont supportés ?
          </Text>
          <Text style={styles.faqAnswer}>JPG, PNG (jusqu’à 10MB).</Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>
            Q: Que faire si la calibration échoue ?
          </Text>
          <Text style={styles.faqAnswer}>
            Vérifiez que les 4 marqueurs sont bien visibles et que l’éclairage
            est suffisant.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>
            Q: Les fichiers DXF sont-ils compatibles ?
          </Text>
          <Text style={styles.faqAnswer}>
            Oui, format R12/R14 compatible avec SolidWorks, AutoCAD et LibreCAD.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>
            Q: Où sont stockées mes détections ?
          </Text>
          <Text style={styles.faqAnswer}>
            Localement sur votre appareil, dans l’onglet Historique.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.supportButton}
        onPress={() => Linking.openURL("mailto:support@replimate.com")}
      >
        <Text style={styles.supportButtonText}>📧 Contacter le support</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Orange Fab Lab © 2025</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#FF6600",
    padding: 30,
    alignItems: "center",
  },
  headerEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  stepCard: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    overflow: "hidden",
  },
  stepNumber: {
    width: 50,
    backgroundColor: "#FF6600",
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumberText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  stepContent: {
    flex: 1,
    padding: 12,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  stepIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1,
  },
  stepDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#2E7D32",
  },
  faqItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  faqAnswer: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  supportButton: {
    backgroundColor: "#2196F3",
    margin: 20,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  supportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
});
