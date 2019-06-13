/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from "express"
import { createVerify } from "crypto"
import { readFileSync } from "fs"
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
    const [payload, signature] = authCookie.split(".")
    const verifyResult = createVerify(ALG)
      .update(payload)
      .verify(publicKey, signature, "hex")
    const payloadObject = JSON.parse(payload)
    const isExpired = payloadObject.expire < Date.now()
    if (verifyResult && !isExpired) {
      req.userId = payloadObject.userId
      next()
    } else {
      res.status(401).send({ message: "UNAUTHORIZED" })
    }
  } else {
    res.status(401).send({ message: "UNAUTHORIZED" })
  }
}
