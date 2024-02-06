import mysql from 'mysql2';
import {dbname, tutorialsTbl, usersTbl, loggersTbl } from '../constants';
import { readFileSync } from 'fs';
import dotenv from "dotenv";
import path from "path";

const envFilePath = path.join(__dirname,'..','..','..','..','.env');
dotenv.config({path:envFilePath});

const connection = mysql.createConnection({
  user: process.env.MYSQL_ROOT,
  port: 3306,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST
});

const sqlFilePath = path.join(__dirname,'..','..','..','sql/mysql.sql');
const sqlQueries: string[] = readFileSync(sqlFilePath,{encoding:'utf8', flag: 'r'})
.toString().replace(/(\r\n|\n|\r)/gm," ") // remove newlines
.replace(/\s+/g, ' ') // excess white space
.split(";") // split into all statements
.map(Function.prototype.call, String.prototype.trim)
.filter(function(el) {return el.length != 0}); // remove any empty one

connection.connect((err)=> {
  if (err) throw err;
  for(const query of sqlQueries){
    connection.query(query, (err, res)=> {
      if (err) throw err;
    });
  }
  console.log(`Successfully created ${dbname}`);
});


export {
  connection,
};
