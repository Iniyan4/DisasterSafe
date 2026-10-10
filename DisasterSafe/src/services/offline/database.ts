
import * as SQLite from 'expo-sqlite';

let databasePromise:
    Promise<SQLite.SQLiteDatabase> | null = null;

async function initializeDatabase() {
    const db = await SQLite.openDatabaseAsync(
        'disastersafe.db'
    );

    await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS shelters (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      address TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      description TEXT NOT NULL,
      verified INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      severity TEXT NOT NULL,
      source TEXT NOT NULL,
      issued_at TEXT NOT NULL,
      expires_at TEXT
    );

    CREATE TABLE IF NOT EXISTS sos_queue (
      id TEXT PRIMARY KEY NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      attempts INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sync_metadata (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);

    return db;
}

export function getDatabase() {
    if (!databasePromise) {
        databasePromise = initializeDatabase().catch(
            (error) => {
                databasePromise = null;
                throw error;
            }
        );
    }

    return databasePromise;
}
