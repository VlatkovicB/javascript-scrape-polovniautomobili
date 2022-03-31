import cron from "node-cron"
import parser from "cron-parser"

import { main } from "./tasks.js"
import { isDevelopment } from "./utils.js"

const CRON_SCHEDULE = isDevelopment() ? "*/20 * * * * *" : "0 * */8 * * *"

export default () => {
  const interval = parser.parseExpression(CRON_SCHEDULE)

  cron.schedule(CRON_SCHEDULE, () => {
    console.log(`Next run will be at: ${interval.next()}`)
    main()
  })
}
