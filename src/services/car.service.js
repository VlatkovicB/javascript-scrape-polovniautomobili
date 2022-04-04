import Models from "../models/index.js"

class CarService {
  constructor() {
    this.models = Models
  }

  async getCars() {
    return this.models.Car.findAll()
  }
}

export default new CarService()
