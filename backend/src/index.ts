import * as express from "express";
import * as cors from "cors";
import Routes from './routes';
import * as dotenv from "dotenv";
import * as path from "path";

var http = require("http");

const envFilePath = path.join(__dirname,'../../../.env');
dotenv.config({path:envFilePath});

export default class Server {
  constructor(app) {
    this.config(app);
    new Routes(app);
  }

  private config(app): void {
    const corsOptions = {
      origin: `http://localhost:${process.env.REACT_PORT}`
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
