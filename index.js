import express from "express"
import runCron from "./src/cron.js"
import { authenticateDb } from "./src/database.js"

import models from "./src/models/index.js"

const PORT = process.env.PORT || 5000

const start = async () => {
  await authenticateDb()
  await models.sync()

  runCron()
  const app = express()

  app.use(express.json())

  app.get("/", async (req, res) => {
    const cars = await models.Car.findAll()

    res.send(cars)
  })

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })
}

start()
