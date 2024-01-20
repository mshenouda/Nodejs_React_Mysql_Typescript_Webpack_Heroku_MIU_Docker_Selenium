import { OkPacket } from "mysql2";
import connection from "../db";

import IUser from "../models/user.model";

interface UserRepository {
  save(user: IUser): Promise<IUser>;
  retrieveAll(searchParams: {username: string, email: boolean}): Promise<IUser[]>;
  retrieveById(userId: number): Promise<IUser | undefined>;
  update(user: IUser): Promise<number>;
  delete(userId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class UserRepository implements UserRepository {
  save(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO users (username, password, email) VALUES(?,?,?)",
        [user.username, user.password, user.email ? user.email : false],
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

  retrieveAll(searchParams: {username?: string, email?: boolean}): Promise<IUser[]> {
    let query: string = "SELECT * FROM users";
    let condition: string = "";

    if (searchParams?.email)
      condition += "email = TRUE"

    if (searchParams?.username)
      condition += `LOWER(username) LIKE '%${searchParams.username}%'`

    if (condition.length)
      query += " WHERE " + condition;

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
        "SELECT * FROM users WHERE id = ?",
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(user: IUser): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?",
        [user.username, user.password, user.email, user.id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
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
