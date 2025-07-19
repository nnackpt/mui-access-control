import Database from "better-sqlite3";
import path from "path";

const DbPath = process.env.NODE_ENV === 'production'
    ? '/tmp/Database.db'
    : path.join(process.cwd(), 'Database.db')

export const DB = new Database(DbPath)

DB.exec(`\
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)