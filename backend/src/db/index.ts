import mysql from "mysql2";
import {dbname, tutorialsTbl, usersTbl, loggersTbl } from '../constants';

// const connection = mysql.createConnection({
//   user: process.env.MYSQL_USER,
//   host: process.env.MYSQL_HOST,
//   password: process.env.MYSQL_PASSWORD
// });

const connection = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'Crestlove_13'
});

connection.connect((err)=> {

  if (err) throw err;
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbname};`, (err, res) =>{
    if(err) throw err;
  });
  connection.query(`USE ${dbname};`, (err, res) =>{
    if(err) throw err;
  });
  let query: string = `CREATE TABLE IF NOT EXISTS ${tutorialsTbl}\
  (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,\ 
    title NVARCHAR(25) NOT NULL,\ 
    description NVARCHAR(25) NOT NULL,\ 
    published BOOLEAN NOT NULL);`;
  connection.query(query, (err, res) =>{
    if(err) throw err;
  });
  query = `CREATE TABLE IF NOT EXISTS ${usersTbl}\
  (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,\ 
    password NVARCHAR(50) NOT NULL,\ 
    email NVARCHAR(50) NOT NULL);`;
  connection.query(query, (err, res) =>{
    if(err) throw err;
  });
  query = `CREATE TABLE IF NOT EXISTS ${loggersTbl}\
  (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,\ 
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
    level NVARCHAR(12) NOT NULL,\
    func NVARCHAR(20) NOT NULL,\ 
    message NVARCHAR(100) NOT NULL);`;
  connection.query(query, (err, res) =>{
    if(err) throw err;
  });
});


export {
  connection,
};
