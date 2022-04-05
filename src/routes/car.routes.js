import express from "express"
import carController from "../controllers/car.controller.js"
import { val } from "../validators/index.js"

const router = express.Router()

router.get("/", val.verifyPagination, async (request, response) => {
  const filters = request.query

  const cars = await carController.getCars(filters)

  response.status(200).send(cars)
})

export default router
