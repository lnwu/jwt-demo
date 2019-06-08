import { Request, Response } from "express"
import { getUserById, getUserIdByEmailAndPassword } from "../db/user.db"

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

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await getUserById(req.userId)
  return res.send(user)
}

export const updateCurrentUser = async (req: Request, res: Response) => {
  return res.send("user")
}
