/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from "express"
import { readFileSync } from "fs"
import { createVerify } from "crypto"
import { ALG } from "../routes/user"

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

const publicKey = readFileSync("/Users/lnwu/Dev/test/public.pem", "utf8")

export const auth = () => (req: Request, res: Response, next: NextFunction) => {
  const authCookie = req.cookies.auth as string
  if (authCookie) {
    const [userId, signedUserId] = authCookie.split(".")
    const verifyResult = createVerify(ALG)
      .update(userId)
      .verify(publicKey, signedUserId, "hex")
    if (verifyResult) {
      req.userId = userId
      next()
    } else {
      res.status(401).send({ message: "UNAUTHORIZED" })
    }
  } else {
    res.status(401).send({ message: "UNAUTHORIZED" })
  }
}
