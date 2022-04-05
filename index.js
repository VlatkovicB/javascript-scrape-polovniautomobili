import runCron from "./src/cron.js"
import { authenticateDb } from "./src/database.js"

import models from "./src/models/index.js"

const start = async () => {
  await authenticateDb()
  await models.sync()

  runCron()
}

start()
