import { OkPacket } from "mysql2";
import {connection} from "../db/index";
import IUser from "../models/user.model";

interface UserRepository {
  save(user: IUser): Promise<IUser>;
  retrieveByEmail(searchParams: {email: string}): Promise<IUser[]>;
  retrieveAll(): Promise<IUser[]>;
  retrieveById(userId: number): Promise<IUser | undefined>;
  delete(userId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class UserRepository implements UserRepository {
  save(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        `INSERT INTO users (email, password) VALUES(?,?)`,
        [user.email, user.password ? user.password : false],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((user) => resolve(user!))
              .catch(reject);
        }
      );
    });
  }

  retrieveByEmail(searchParams: {email: string, password: string}): Promise<IUser[]> {
    let query: string = `SELECT * FROM users`;
    let condition: string = "";

    if (searchParams?.email)
      condition += `LOWER(email) LIKE '%${searchParams.email}%' AND `

    if (searchParams?.password)
      condition += `password LIKE '%${searchParams.password}%'`
  
    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<IUser[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveAll(): Promise<IUser[]> {
    let query: string = `SELECT * FROM users`;
    return new Promise((resolve, reject) => {
      connection.query<IUser[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(userId: number): Promise<IUser> {
    return new Promise((resolve, reject) => {
      connection.query<IUser[]>(
        `SELECT * FROM users WHERE id = ?`,
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  delete(userId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM users WHERE id = ?",
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>("DELETE FROM users", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new UserRepository();
