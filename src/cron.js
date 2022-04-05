import cron from "node-cron"
import parser from "cron-parser"

import { main } from "./tasks.js"
import { isDevelopment } from "./scrape/utils.js"

const TIMINGS = {
  EVERY_20_SECS: "*/20 * * * * *",
  EVRERY_5_MINS: "* 0/5 * * * *",
  EVERY_8_HOURS: "0 */8 * * *",
}

const CRON_SCHEDULE = isDevelopment()
  ? TIMINGS.EVRERY_5_MINS
  : TIMINGS.EVERY_8_HOURS

export default () => {
  const interval = parser.parseExpression(CRON_SCHEDULE)
  console.log(`Next run will be at: ${interval.next()}`)

  cron.schedule(CRON_SCHEDULE, () => {
    console.log(`Next run will be at: ${interval.next()}`)
    main()
  })
}
