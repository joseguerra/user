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

  delete(){
    let sql = 'DELETE FROM tasks';
    return this.db.executeSql(sql, []);
  }  

  select(){
    let sql = 'SELECT * FROM tasks';
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }


  createMenu(menu: any){
    let sql = 'INSERT INTO menu(menu) VALUES(?)';
    return this.db.executeSql(sql, [menu]);
  }

  createTableMenu(){
    let sql = 'CREATE TABLE IF NOT EXISTS menu(id INTEGER PRIMARY KEY AUTOINCREMENT, menu TEXT)';
    return this.db.executeSql(sql, []);
  }

  deleteMenu(){
    let sql = 'DELETE FROM menu';
    return this.db.executeSql(sql, []);
  }

  selectMenu(){
    let sql = 'SELECT menu FROM menu';
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }


}