import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class BdService {

  // public properties

  db: SQLiteObject = null;

  constructor() {}

  // public methods

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(token: any){
    let sql = 'INSERT INTO tasks(token) VALUES(?)';
    return this.db.executeSql(sql, [token]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT)';
    return this.db.executeSql(sql, []);
  }

  delete(token: any){
    let sql = 'DELETE FROM tasks WHERE token=?';
    return this.db.executeSql(sql, [token]);
  }

  select(){
    let sql = 'SELECT * FROM tasks';
    this.db.executeSql(sql, [])
    .then(response => {
      return response.rows.length
    })
    .catch(() =>{
      return 0
    });

    return 0;
  }


}