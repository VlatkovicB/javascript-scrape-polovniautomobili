import CarService from "../services/car.service.js"

class CarController {
  constructor() {
    this.carService = CarService
  }

  async getCars() {
    return this.carService.getCars()
  }
}

export default new CarController()
