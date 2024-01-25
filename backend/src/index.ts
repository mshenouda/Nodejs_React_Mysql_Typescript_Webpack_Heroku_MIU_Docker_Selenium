import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from './routes';
import dotenv from "dotenv";
import path from "path";

var http = require("http");

const envFilePath = path.join(__dirname,'..','..','..','.env');
dotenv.config({path:envFilePath});

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: `http://localhost:${process.env.REACT_PORT}`
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
