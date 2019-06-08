/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from "express"

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

export const auth = () => (req: Request, res: Response, next: NextFunction) => {
  const authCookie = req.cookies.auth
  if (authCookie) {
    req.userId = authCookie
    next()
  } else {
    res.status(401).send({ message: "UNAUTHORIZED" })
  }
}
