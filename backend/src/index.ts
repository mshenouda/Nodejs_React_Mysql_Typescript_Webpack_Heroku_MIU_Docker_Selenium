import * as express from "express";
import * as cors from "cors";
import Routes from './routes';
import * as path from "path";

const http = require("http");
//if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path:path.join(__dirname,'../../../.env')});
//}


export default class Server {
  constructor(app) {
    this.config(app);
    new Routes(app);
  }

  private config(app): void {
    const corsOptions = {
      origin: `http://${process.env.HOST}:${process.env.REACT_PORT}`
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
