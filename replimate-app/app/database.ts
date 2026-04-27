import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("replimate.db");

export function initDatabase() {
  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS detections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      scale REAL,
      angle REAL,
      points TEXT,
      dxfData TEXT
    );
  `);
}
