import Models from "../models/index.js"

class CarService {
  constructor() {
    this.models = Models
  }

  async getCars(filters) {
    const { page, limit } = filters

    return this.models.Car.findAndCountAll({
      where: {},
      offset: page * limit || 0,
      page: page || 1,
      limit: limit || 100,
    })
  }
}

export default new CarService()
