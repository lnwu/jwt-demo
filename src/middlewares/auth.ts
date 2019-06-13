/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from "express"
import { createVerify } from "crypto"
import { readFileSync } from "fs"
import base64url from "base64url"
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
    const verify = createVerify(ALG)
    const [header, payload, signature] = authCookie.split(".")

    verify.update(`${header}.${payload}`)

    const verifyResult = verify.verify(publicKey, signature, "hex")
    if (verifyResult) {
      const payloadObject = JSON.parse(base64url.decode(payload))
      req.userId = payloadObject.sub
      next()
    } else {
      res.status(401).send({ message: "UNAUTHORIZED" })
    }
  } else {
    res.status(401).send({ message: "UNAUTHORIZED" })
  }
}
