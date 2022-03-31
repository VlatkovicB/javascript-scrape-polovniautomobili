import express from "express"

import Car from "./src/car.model.js"
import { authenticateDb } from "./src/database.js"
import runCron from "./src/cron.js"

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

try {
  start()
} catch (error) {
  console.log(error)
  process.exit(1)
}
