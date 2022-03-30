import getCars from "./scrape.js"
import db from "./database.js"
import Car from "./car.model.js"

const main = async () => {
  await db.sequelize.authenticate()

  const cars = await getCars()
  await Car.sync({ force: true })

  for await (const car of cars) {
    const newCar = await Car.create({ ...car })
    await newCar.save()
  }

  console.log(cars[0])
}

main()
