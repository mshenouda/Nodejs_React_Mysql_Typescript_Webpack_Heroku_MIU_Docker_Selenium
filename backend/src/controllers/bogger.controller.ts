import { Request, Response } from "express";

export function welcome(req: Request, res: Response): Response {
  console.log(req.body);
  return res.json({message: 'JSON.stringify(req)'});
}
