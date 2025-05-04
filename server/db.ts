import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from '../shared/schema';
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
const sqlite = new Database("mydb.db", {
  fileMustExist: false
});

export const db = drizzle(sqlite, {
  schema,
});


export const pool = sqlite;