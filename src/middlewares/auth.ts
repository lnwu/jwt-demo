import { Request, Response, NextFunction } from "express"

export type TAuthRequest = Request & {
  userId: string
}

export const auth = () => (req: Request, res: Response, next: NextFunction) => {
  ;(req as TAuthRequest).userId = "w0cBUnEQqq5qdScAJUdz"
  next()
}
