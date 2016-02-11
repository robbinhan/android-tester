import sqlite3 from 'sqlite3';
let db = null
if (process.env.NODE_ENV === 'development') {
   db = new sqlite3.Database("./db/mysdb.sqlite");
} else {
   db = new sqlite3.Database(process.resourcesPath + "/app/db/mysdb.sqlite");
}

export default db;
