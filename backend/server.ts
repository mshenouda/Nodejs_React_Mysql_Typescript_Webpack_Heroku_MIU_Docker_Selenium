import express, { Application } from "express";
import Server from "./src/index";
import dotenv from "dotenv";
import path from "path";

const envFilePath = path.join(__dirname,'..','..','.env');
dotenv.config({path:envFilePath});
const app: Application = express();
const server: Server = new Server(app);
const SERVER_PORT: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 8080;


app
  .listen(SERVER_PORT, "localhost", function () {
    console.log(`Server is running on port ${SERVER_PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
