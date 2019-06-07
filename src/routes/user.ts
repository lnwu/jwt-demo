import { Request, Response } from "express"
import { getUserById } from "../db/user.db"

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await getUserById(req.userId)
  return res.send(user)
}

export const updateCurrentUser = async (req: Request, res: Response) => {
  return res.send("user")
}
