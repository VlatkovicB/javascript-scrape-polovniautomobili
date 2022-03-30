const formatWithoutUnit = (amount) =>
  parseInt(amount.split(" ")[0].replace(".", ""))

export const sortArray = (arr, by, order = "ASC") =>
  order === "ASC"
    ? arr.sort((a, b) => (a[by] > b[by] ? 1 : a[by] === b[by] ? 0 : -1))
    : arr.sort((a, b) => (a[by] < b[by] ? 1 : a[by] === b[by] ? 0 : -1))

export const processCarObject = (car) => ({
  ...car,
  engine: car.engine.split("<sup>")[0],
  price: formatWithoutUnit(car.price),
  mileage: formatWithoutUnit(car.mileage),
  year: formatWithoutUnit(car.year),
})

export const isDevelopment = () => process.env.ENV === "development"
