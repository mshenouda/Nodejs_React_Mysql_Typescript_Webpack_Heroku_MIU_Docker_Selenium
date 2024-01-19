import { RowDataPacket } from "mysql2"

export default interface ILogger extends RowDataPacket {
  id?: number;
  timestamp?: string;
  level?: string;
  func?: string;
  message?: string;
}

export interface ILoggerTable {
  tableName: string 
 }
