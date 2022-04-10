import puppeteer from "puppeteer"
import { isDevelopment } from "./utils.js"

export default async (callback) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  })
  const page = await browser.newPage()

  if (isDevelopment()) {
    page.on("console", (consoleObj) => console.log(consoleObj.text()))
  }

  const result = await callback(page)

  await browser.close()

  return result
}
