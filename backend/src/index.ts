import express, {Application} from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import Routes from './routes';
import path from "path";

const http = require("http");
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path:path.join(__dirname,'../../../.env')});
}


export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app): void {
    const corsOptions = {
      origin: `http://${process.env.HOST}:${process.env.REACT_PORT}`
    };

    var public = path.join(__dirname, '../../../frontend/dist/');
    if (process.env.NODE_ENV === "production") {
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(path.join(public, 'index.html')));
      });
    }

    app.use(cors(corsOptions));
    app.use(bodyParser.json({ type: 'application/*+json' }))
    app.use(bodyParser.text({ type: 'text/html' }))
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
  }
}
