import express from "express"
import carController from "../controllers/car.controller.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const cars = await carController.getCars()

  res.status(200).send(cars)
})

export default router
