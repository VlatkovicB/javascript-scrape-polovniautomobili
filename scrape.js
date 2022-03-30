import puppeteer from "puppeteer"
import { processCarObject } from "./utils.js"

import { ADS_PER_PAGE, CAR_INFO } from "./constants.js"

const getUrl = (page) => {
  let base = "https://www.polovniautomobili.com/auto-oglasi/pretraga?"
  let pageQuery = ""
  if (page > 1) {
    pageQuery = `page=${page}`
  }
  return `${base}${pageQuery}brand=mazda&sort=basic&model%5B0%5D=3&price_from=10000&year_from=2015&year_to=2019&fuel%5B0%5D=45&door_num=3013&without_price=1&showOldNew=all`
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

export default async () => {
  let url = getUrl()

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  page.on("console", (consoleObj) => console.log(consoleObj.text()))
  await page.goto(url)

  const results = await numberOfAds(page)
  const adsNumber = parseInt(results[0])

  let pageNumber = 1
  let totalnumberOfPages = Math.ceil(adsNumber / ADS_PER_PAGE)
  let allAds = []

  while (pageNumber <= totalnumberOfPages) {
    await page.goto(getUrl(pageNumber))

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
          singleDiv["id"] = el.getAttribute("data-classifiedid")
          singleDiv["city"] = el.querySelector(".city").textContent.trim()

          divs.forEach((div, index) => {
            console.log(div.innerHTML, CAR_INFO[index])
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

  browser.close()
  console.log(allAds[0])
  return allAds.map((car) => processCarObject(car))
}
