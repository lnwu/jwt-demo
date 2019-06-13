import { Request, Response } from "express"
import {
  getUserById,
  getUserIdByEmailAndPassword,
  updateUserById
} from "../db/user.db"
import { readFileSync } from "fs"
import { createSign } from "crypto"

const privateKey = readFileSync("/Users/lnwu/Dev/test/private.pem", "utf8")
export const ALG = "RSA-SHA256"

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(401).send({ message: "Email/password is required!" })
  }

  const userId = await getUserIdByEmailAndPassword(email, password)
  if (userId) {
    const sign = createSign(ALG)
    sign.update(userId)
    const signedUserId = sign.sign(privateKey, "hex")
    res.cookie("auth", `${userId}.${signedUserId}`, {
      httpOnly: true,
      maxAge: 1000 * 60
    })
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
