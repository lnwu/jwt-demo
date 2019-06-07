import express from "express"
import { getCurrentUser, updateCurrentUser } from "./routes/user"
import morgan from "morgan"
import { auth } from "./middlewares/auth"

export const app = express()

app.use(morgan("tiny"))
app.use(auth())

app.get("/user", getCurrentUser)
app.put("/user", updateCurrentUser)
