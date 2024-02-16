import express, {Application} from "express";
import path from "path";
import Server from "./src/index";


if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path:path.join(__dirname,'../../../.env')});
}
const app: Application= express();
const server: Server = new Server(app);
//const HOST: string = process.env.REACT_APP_PUBLIC_URL;
const HOST: string = process.env.HOST;
let PORT: number;
if (process.env.NODE_ENV === 'production')
  PORT = process.env.PORT;
else
  PORT = process.env.REACT_APP_SERVER_PORT ? parseInt(process.env.REACT_APP_SERVER_PORT, 10) : 8082;

app
  .listen(PORT, HOST, ()=> {
    console.log(`Server is running on HOST:${HOST} PORT:${PORT} MODE:${process.env.NODE_ENV}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
