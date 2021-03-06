import { Request, Response } from "express"
import {
  getUserById,
  getUserIdByEmailAndPassword,
  updateUserById
} from "../db/user.db"

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(401).send({ message: "Email/password is required!" })
  }

  const userId = getUserIdByEmailAndPassword(email, password)
  if (await userId) {
    res.cookie("auth", await userId, { httpOnly: true })
    res.send({ message: "Login succeed!" })
  } else {
    res.status(401).send({ message: "Email/password is wrong!" })
  }
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("auth")
  res.send({ message: "Logout succeed!" })
}

export const getCurrentUser = async (req: Request, res: Response) =>
  res.send(await getUserById(req.userId))

export const updateCurrentUser = async (req: Request, res: Response) =>
  res.send(await updateUserById(req.userId, req.body))
