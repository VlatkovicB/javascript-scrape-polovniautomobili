import express from "express"
import routes from "./routes/index.js"

const start = async () => {
  const app = express()
  const PORT = process.env.PORT || 5000

  app.use(express.json())

  app.use("/api/v1", routes)

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })

  return app
}

export default {
  start,
}
