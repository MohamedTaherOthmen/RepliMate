import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  DETECTIONS: "@replimate_detections",
};

export const saveDetection = async (detection) => {
  try {
    const existing = await getDetections();
    const newDetection = {
      id: Date.now().toString(),
      ...detection,
      date: new Date().toLocaleString(),
    };
    const updated = [newDetection, ...existing];
    await AsyncStorage.setItem(
      STORAGE_KEYS.DETECTIONS,
      JSON.stringify(updated),
    );
    return newDetection;
  } catch (error) {
    console.error("Erreur sauvegarde:", error);
    return null;
  }
};

export const getDetections = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DETECTIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erreur lecture:", error);
    return [];
  }
};

export const deleteDetection = async (id) => {
  try {
    const detections = await getDetections();
    const filtered = detections.filter((d) => d.id !== id);
    await AsyncStorage.setItem(
      STORAGE_KEYS.DETECTIONS,
      JSON.stringify(filtered),
    );
    return true;
  } catch (error) {
    console.error("Erreur suppression:", error);
    return false;
  }
};

export const updateDetection = async (id, updates) => {
  try {
    const detections = await getDetections();
    const index = detections.findIndex((d) => d.id === id);

    if (index === -1) return false;

    detections[index] = { ...detections[index], ...updates };
    await AsyncStorage.setItem(
      STORAGE_KEYS.DETECTIONS,
      JSON.stringify(detections),
    );
    return true;
  } catch (error) {
    console.error("Erreur mise à jour:", error);
    return false;
  }
};
