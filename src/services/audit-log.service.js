import _ from "lodash"
import models from "../models/index.js"

const prepareHook = (modelName, excludedFields) => (row, opts) => {
  const changedFields = []

  for (const field of row.changed()) {
    if (excludedFields.indexOf(field) !== -1) continue

    if (
      row.dataValues[field] !== null &&
      row._previousDataValues[field] !== null &&
      !isNaN(row.dataValues[field]) &&
      !isNaN(
        row._previousDataValues[field] &&
          Number(row.dataValues[field]) ===
            Number(row._previousDataValues[field])
      )
    )
      continue

    if (_.isEqual(row.dataValues[field], row._previousDataValues[field]))
      continue

    changedFields.push(field)
  }

  const newValues = _.pick(row.dataValues, changedFields)
  const oldValues = _.pick(row._previousDataValues, changedFields)

  if (!Object.keys(newValues).length + Object.keys(oldValues).length) return

  return models.AuditLog.create({
    model_name: modelName,
    old_values: oldValues,
    new_values: newValues,
    date: new Date(),
  })
}

const audit = (Model, modelName, excludedFields = []) => {
  excludedFields = _.uniq([...excludedFields, "created_at", "updated_at"])

  const hook = prepareHook(modelName, excludedFields)

  Model.afterSave(hook)
  Model.afterUpsert(hook)
  Model.afterDestroy(hook)
}

export default {
  audit,
}
