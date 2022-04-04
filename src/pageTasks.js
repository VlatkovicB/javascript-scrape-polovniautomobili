import { ADS_PER_PAGE, BASE_URL, CAR_INFO } from "./constants.js"
import { processCarObject } from "./utils.js"

const {
  PRICE_FROM = 10000,
  PRICE_TO = 20000,
  YEAR_FROM = 2014,
  YEAR_TO = 2020,
} = process.env

const buildUrl = (page) => {
  let base = `${BASE_URL}auto-oglasi/pretraga?`
  const model = "model%5B0%5D=3&model%5B1%5D=cx-3&model%5B2%5D=cx-30"
  let pageQuery = ""
  if (page > 1) {
    pageQuery = `page=${page}`
  }
  const url = `${base}${pageQuery}brand=mazda&sort=basic&${model}&price_from=${PRICE_FROM}&price_to=${PRICE_TO}&year_from=${YEAR_FROM}&year_to=${YEAR_TO}&fuel%5B0%5D=45&door_num=3013&without_price=1&showOldNew=all`
  return url
}

const numberOfAds = (page) =>
  page
    .$$eval("small", (priceString) =>
      priceString.map((el) => {
        const strings = el.innerHTML.split(" ")
        if (strings.length === 9) return strings[strings.length - 1]
      })
    )
    .then((el) => el.filter((el) => el))

export const getAllCars = async (page) => {
  let url = buildUrl()
  await page.goto(url)

  const results = await numberOfAds(page)
  const adsNumber = parseInt(results[0])

  let pageNumber = 1
  let totalnumberOfPages = Math.ceil(adsNumber / ADS_PER_PAGE)
  let allAds = []

  while (pageNumber <= totalnumberOfPages) {
    await page.goto(buildUrl(pageNumber))

    const ads = await page.$$eval(
      "article:not(.uk-hidden)",
      (elements, { CAR_INFO }) =>
        elements.map((el) => {
          const divs = el.querySelectorAll(".bottom, .top")
          let singleDiv = {}

          singleDiv["name"] = el
            .querySelector(".textContent h2 a")
            .innerHTML.replace(/\n|\t/g, "")

          singleDiv["price"] = el.getAttribute("data-price")
          const date = new Date(el.getAttribute("data-renewdate"))

          singleDiv["renewDate"] = date.toString() ?? new Date().toString()
          singleDiv["id"] = el.getAttribute("data-classifiedid")
          singleDiv["city"] = el.querySelector(".city").textContent.trim()
          singleDiv["description"] = el
            .querySelector(".subtitle")
            .textContent.replace(/\n|\t/g, "")
          singleDiv["link"] = el.querySelector(".ga-title").getAttribute("href")

          divs.forEach((div, index) => {
            singleDiv[CAR_INFO[index]] = div.innerHTML
              .split("</i>")
              .pop()
              .trim()
              .replace(/\n|\t/g, "")
          })

          return singleDiv
        }),
      { CAR_INFO }
    )

    allAds = [...allAds, ...ads]
    pageNumber++
  }

  return allAds.map((car) => processCarObject(car))
}
