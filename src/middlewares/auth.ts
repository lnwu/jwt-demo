/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from "express"
import { readFileSync } from "fs"
import jwt from "jsonwebtoken"

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
  try {
    const verifyResult = jwt.verify(authCookie, publicKey) as any
    if (verifyResult) {
      req.userId = verifyResult.sub
      next()
    } else {
      res.status(401).send({ message: "UNAUTHORIZED" })
    }
  } catch (error) {
    res.status(401).send({ message: error })
  }
}
