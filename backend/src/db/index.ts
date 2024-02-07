import * as mysql from 'mysql2';
import { readFileSync } from 'fs';
import * as dotenv from "dotenv";
import * as path from "path";

const envFilePath = path.join(__dirname,'./../../../../.env');
dotenv.config({path:envFilePath});

const connection = mysql.createConnection({
  user: process.env.MYSQL_ROOT,
  port: parseInt(process.env.MYSQL_PORT, 10),
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database : process.env.MYSQL_DATABASE
});

connection.connect((err)=> {
  if (err) throw err;
  console.log(`Successfully connected to ${process.env.MYSQL_DATABASE}`);
});


export {
  connection,
};
