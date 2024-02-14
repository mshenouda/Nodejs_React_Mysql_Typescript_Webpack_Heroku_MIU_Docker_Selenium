import express, {Application} from "express";
import path from "path";
import Server from "./src/index";


if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path:path.join(__dirname,'../../../.env')});
}

const app: Application= express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8082;
const HOST: string = process.env.HOST;

app
  .listen(PORT, HOST, ()=> {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
