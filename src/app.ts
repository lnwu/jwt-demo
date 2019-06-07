import * as express from "express"

export const app = express()

app.get("/test", async (req, res) => {
  res.send("Hello world!")
})
