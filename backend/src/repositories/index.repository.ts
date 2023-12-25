import { OkPacket } from "mysql2";
import connection from "../db";
import { ITutorialTable } from "../models/tutorial.model";

interface IndexRepository {
    create(tableName: string): Promise<string>;
    describe(tableName: string): Promise<any[] | undefined>;
}

class IndexRepository implements IndexRepository {
    create(tableName: string): Promise<any> {
        // Query to create table 
        const query: string = `CREATE TABLE IF NOT EXISTS ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(10) NOT NULL, description VARCHAR(12) NOT NULL, published BOOLEAN NULL)`
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.describe(tableName));
                    // this.describe(table)
                    //     .then(res => console.log(res))
                    //     .catch(reject);
                    // //resolve(res);
                }
            })
        })
    }

    describe(tableName: string): Promise<any[] | any> {
        return new Promise((reject, resolve) => {
            const query: string = "DESCRIBE tutorials";
            connection.query<OkPacket>(query, [], (err, res) => {
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
