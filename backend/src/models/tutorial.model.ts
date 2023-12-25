import { RowDataPacket } from "mysql2"

export default interface ITutorial extends RowDataPacket {
  id?: number;
  title?: string;
  description?: string;
  published?: boolean;
}

export interface ITutorialTable {
  tableName: string 
 }
