import getCars from "./scrape.js"
import db from "./database.js"
import Car from "./car.model.js"

const main = async () => {
  await db.sequelize.authenticate()
  await db.sequelize.sync()

  const cars = await getCars()

  for await (let car of cars) {
    const exists = await Car.findOne({
      where: {
        id: car.id.toString(),
      },
    })

    if (exists) {
      await Car.update({ ...car }, { where: { id: car.id } }, { multi: true })
    } else {
      car = await Car.create({ ...car })
      car.save()
    }
  }
}

main()
