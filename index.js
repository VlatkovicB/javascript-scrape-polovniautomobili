import runCron from "./src/cron.js"
import { authenticateDb } from "./src/database.js"
import Server from "./src/server.js"

import models from "./src/models/index.js"

const start = async () => {
  await authenticateDb()
  await models.sync()

  Server.start()
  runCron()
}

start()
