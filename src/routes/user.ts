import { Request, Response } from "express"
import {
  getUserById,
  getUserIdByEmailAndPassword,
  updateUserById
} from "../db/user.db"
import { createSign } from "crypto"
import { readFileSync } from "fs"
import jwt from "jsonwebtoken"

const privateKey = readFileSync("/Users/lnwu/Dev/test/private.pem", "utf8")
export const ALG = "RSA-SHA256"

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(401).send({ message: "Email/password is required!" })
  }

  const userId = await getUserIdByEmailAndPassword(email, password)
  if (userId) {
    const payload = {
      sub: userId
    }
    const idToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "10s"
    })
    res.cookie("auth", idToken, { httpOnly: true })
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
