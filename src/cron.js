import cron from "node-cron"
import parser from "cron-parser"

import { main } from "./tasks.js"
import { isDevelopment } from "./scrape/utils.js"

const TIMINGS = {
  EVERY_20_SECS: "*/20 * * * * *",
  EVERY_5_MINS: "* 0/5 * * * *",
  EVERY_20_MINS: "* 0/20 * * * *",
  EVERY_8_HOURS: "0 */8 * * *",
}

const CRON_SCHEDULE = isDevelopment()
  ? TIMINGS.EVERY_20_SECS
  : TIMINGS.EVERY_8_HOURS

export default () => {
  const interval = parser.parseExpression(CRON_SCHEDULE)
  console.log(
    `Next run will be in: ${milisecondsToTime(
      interval.next().toDate().getTime() - new Date().getTime()
    )}`
  )

  cron.schedule(CRON_SCHEDULE, () => {
    console.log(`Next run will be at: ${interval.next()}`)
    main()
  })
}

const milisecondsToTime = (time) => {
  const ms = time % 1000
  time = (time - ms) / 1000
  const secs = time % 60
  time = (time - secs) / 60
  const mins = time % 60
  const hrs = (time - mins) / 60

  return (
    hrs.toString().padStart(2, 0) +
    ":" +
    mins.toString().padStart(2, 0) +
    ":" +
    secs.toString().padStart(2, 0) +
    "." +
    ms.toString().padStart(2, 0)
  )
}
