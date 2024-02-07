import * as express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import Server from "./src/index";

const envFilePath = path.join(__dirname,'..','..','.env');
dotenv.config({path:envFilePath});
const app= express();
const server: Server = new Server(app);
const SERVER_PORT: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 8082;


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
