import { Request, Response } from "express"

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.send("user")
}

export const updateCurrentUser = async (req: Request, res: Response) => {
  return res.send("user")
}
