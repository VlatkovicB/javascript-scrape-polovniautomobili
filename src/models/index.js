import Car from "./car.model.js"
import PageVisit from "./page-visit.model.js"
import AuditLog from "./audit-log.model.js"

const sync = async () => {
  await Car.sync({ alter: true })
  await PageVisit.sync({ alter: true })
  await AuditLog.sync({ alter: true })
}

export default {
  PageVisit,
  Car,
  sync,
  AuditLog,
}
