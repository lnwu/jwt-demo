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
  req.userId = "EM9ei4VS0ViJ13WqBgAv"
  next()
}
