import * as mysql from 'mysql2';
import { readFileSync } from 'fs';
import * as path from "path";


if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path:path.join(__dirname,'./../../../../.env')});
}

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: parseInt(process.env.MYSQL_PORT, 10),
  password: process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});

connection.connect((err)=> {
  if (err) throw err;
  console.log(`Successfully connected to ${process.env.MYSQL_DATABASE}`);
});


export {
  connection,
};
