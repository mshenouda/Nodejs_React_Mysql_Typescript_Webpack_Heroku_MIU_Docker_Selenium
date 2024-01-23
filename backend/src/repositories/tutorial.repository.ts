import { OkPacket } from "mysql2";
import {connection} from "../db/index";
import ITutorial from "../models/tutorial.model";
import {dbname, tutorialName} from "../constants";

interface TutorialRepository {
  create(): Promise<any>;
  save(tutorial: ITutorial): Promise<ITutorial>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<ITutorial[]>;
  retrieveById(tutorialId: number): Promise<ITutorial | undefined>;
  update(tutorial: ITutorial): Promise<number>;
  delete(tutorialId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class TutorialRepository implements TutorialRepository {
  create(): Promise<any> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        `CREATE TABLE IF NOT EXISTS ${dbname}.${tutorialName} (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, title NVARCHAR(25) NOT NULL, description NVARCHAR(25) NOT NULL, published BOOLEAN NOT NULL);`, [],
        (err, res) => {
          if (err) reject(err);
          else resolve(res)
        }
      );
    });
  }
    
  save(tutorial: ITutorial): Promise<ITutorial> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        `INSERT INTO ${dbname}.${tutorialName} (title, description, published) VALUES(?,?,?)`,
        [tutorial.title, tutorial.description, tutorial.published ? tutorial.published : false],
        (err, res) => {
          if (err) reject(err);
          else {
            console.log(res);
            this.retrieveById(res.insertId)
                .then((tutorial) => resolve(tutorial!))
                .catch(reject);
          }
        }
      );
    });
  }

  retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<ITutorial[]> {
    let query: string = `SELECT * FROM ${dbname}.${tutorialName}`;
    let condition: string = "";

    if (searchParams?.published)
      condition += "published = TRUE"

    if (searchParams?.title)
      condition += `LOWER(title) LIKE '%${searchParams.title}%'`

    if (condition.length)
      query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<ITutorial[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(tutorialId: number): Promise<ITutorial> {
    return new Promise((resolve, reject) => {
      connection.query<ITutorial[]>(
        `SELECT * FROM ${dbname}.${tutorialName} WHERE id = ?`,
        [tutorialId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(tutorial: ITutorial): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        `UPDATE ${dbname}.${tutorialName} SET title = ?, description = ?, published = ? WHERE id = ?`,
        [tutorial.title, tutorial.description, tutorial.published, tutorial.id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(tutorialId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        `DELETE FROM ${dbname}.${tutorialName} WHERE id = ?`,
        [tutorialId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(`DELETE FROM ${dbname}.${tutorialName}`, (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new TutorialRepository();
