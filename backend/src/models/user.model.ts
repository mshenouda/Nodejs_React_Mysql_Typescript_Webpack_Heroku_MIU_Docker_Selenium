import { RowDataPacket } from "mysql2"

export default interface IUser extends RowDataPacket {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
}

export interface IUserTable {
  tableName: string 
 }
