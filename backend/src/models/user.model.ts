import { RowDataPacket } from "mysql2"

export default interface IUser extends RowDataPacket {
  id?: number;
  password?: string;
  userName?: string;
}

export interface IUserTable {
  tableName: string 
 }
