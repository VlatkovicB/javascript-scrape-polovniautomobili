import CarService from "../services/car.service.js"

class CarController {
  constructor() {
    this.carService = CarService
  }

  async getCars(filters) {
    return this.carService.getCars(filters)
  }
}

export default new CarController()
