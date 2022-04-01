import getCars from "./scrape.js"
import models from "./models/index.js"

export const main = async () => {
  const cars = await getCars()

  for await (let car of cars) {
    const exists = await models.Car.findOne({
      where: {
        id: car.id.toString(),
      },
    })

    if (exists) {
      await models.Car.update(
        { ...car },
        { where: { id: car.id } },
        { multi: true }
      )
    } else {
      car = await models.Car.create({ ...car })
      car.save()
    }
  }
}
