import cron from "node-cron"
import { main } from "./tasks.js"

export default () => {
  main()
  cron.schedule("0 * */8 * * *", main)
}
