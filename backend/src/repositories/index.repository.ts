import { OkPacket } from "mysql2";
import {connection} from "../db/index";

interface IndexRepository {
    create(dbname: string): Promise<any>;
    describe(dbname: string): Promise<any>;
}

class IndexRepository implements IndexRepository {

    create(dbname: string): Promise<any> {
        // Query to create database 
        const query: string = `CREATE DATABASE IF NOT EXISTS ${dbname};`;
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                    // this.describe(dbname)
                    // .then(res => resolve(res))
                    // .catch(err => reject(err));
                }
            })
        })
    }

    describe(dbname: string): Promise<any> {
        return new Promise((reject, resolve) => {
            const query: string = `USE ${dbname}`;
            connection.query<OkPacket>(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        })
    }
}
 

export default new IndexRepository();
