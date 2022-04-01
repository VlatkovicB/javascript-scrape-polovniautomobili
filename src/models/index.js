import Car from "./car.model.js"

const sync = async () => {
  await Car.sync({ alter: true })
}

export default {
  Car,
  sync,
}
