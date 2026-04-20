import { db } from "./database";

export type Detection = {
  id?: number;
  name: string;
  date?: string;
  scale?: number | null;
  angle?: number | null;
  points?: number[][] | any[];
  dxfData?: string;
};

export const saveDetection = async (detection: Detection) => {
  try {
    const date = new Date().toLocaleString();

    const result = db.runSync(
      `INSERT INTO detections (name, date, scale, angle, points, dxfData)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        detection.name,
        date,
        detection.scale ?? null,
        detection.angle ?? null,
        JSON.stringify(detection.points ?? []),
        detection.dxfData ?? "",
      ]
    );

    return {
      id: result.lastInsertRowId,
      ...detection,
      date,
    };
  } catch (error) {
    console.error("Erreur sauvegarde SQLite:", error);
    return null;
  }
};

export const getDetections = async (): Promise<Detection[]> => {
  try {
    const rows = db.getAllSync<any>(
      `SELECT * FROM detections ORDER BY id DESC`
    );

    return rows.map((row) => ({
      ...row,
      points: row.points ? JSON.parse(row.points) : [],
    }));
  } catch (error) {
    console.error("Erreur lecture SQLite:", error);
    return [];
  }
};

export const deleteDetection = async (id: number) => {
  try {
    db.runSync(`DELETE FROM detections WHERE id = ?`, [id]);
    return true;
  } catch (error) {
    console.error("Erreur suppression SQLite:", error);
    return false;
  }
};

export const updateDetection = async (id: number, updates: Detection) => {
  try {
    const existing = db.getFirstSync<any>(
      `SELECT * FROM detections WHERE id = ?`,
      [id]
    );

    if (!existing) {
      return false;
    }

    db.runSync(
      `UPDATE detections
       SET name = ?, scale = ?, angle = ?, points = ?, dxfData = ?
       WHERE id = ?`,
      [
        updates.name ?? existing.name,
        updates.scale ?? existing.scale,
        updates.angle ?? existing.angle,
        JSON.stringify(updates.points ?? JSON.parse(existing.points || "[]")),
        updates.dxfData ?? existing.dxfData,
        id,
      ]
    );

    return true;
  } catch (error) {
    console.error("Erreur mise à jour SQLite:", error);
    return false;
  }
};

export default {
  saveDetection,
  getDetections,
  deleteDetection,
  updateDetection,
};
