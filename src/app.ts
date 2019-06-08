import express from "express"
import { getCurrentUser, updateCurrentUser, login } from "./routes/user"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { auth } from "./middlewares/auth"
import bodyParser = require("body-parser")

export const app = express()

app.use(morgan("tiny"))
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/user", auth())

app.get("/user", getCurrentUser)
app.put("/user", updateCurrentUser)
app.post("/login", login)
