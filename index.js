import express from "express"

import Car from "./car.model.js"
import { authenticateDb } from "./database.js"
import runCron from "./cron.js"

const PORT = process.env.PORT || 5000

const start = async () => {
  await authenticateDb()
  runCron()
  const app = express()

  app.use(express.json())

  app.get("/", async (req, res) => {
    const cars = await Car.findAll()

    res.send(cars)
  })

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })
}

start()
