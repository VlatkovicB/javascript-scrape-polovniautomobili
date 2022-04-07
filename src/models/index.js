import Car from "./car.model.js"
import PageVisit from "./page-visit.model.js"

const sync = async () => {
  await Car.sync({ alter: true })
  await PageVisit.sync({ alter: true })
}

export default {
  PageVisit,
  Car,
  sync,
}
