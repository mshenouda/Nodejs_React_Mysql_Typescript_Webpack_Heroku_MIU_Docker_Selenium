import * as express from "express";
import * as path from "path";
import Server from "./src/index";


if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path:path.join(__dirname,'../../../.env')});
  console.log(process.env);
}

const app= express();
const server: Server = new Server(app);
const SERVER_PORT: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 8082;


app
  .listen(SERVER_PORT, ()=> {
    console.log(`Server is running on port ${SERVER_PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
