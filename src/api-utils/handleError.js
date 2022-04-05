import SequelizeErrors from "sequelize/lib/errors"

import Errors from "../errors/errors.js"
import { ERROR_MESSAGES } from "../errors/errorMessages.js"

export default (incomingError, request, response, next) => {
  let error

  if (incomingError instanceof Errors.GlobalError) {
    error = incomingError.toJSON()
  }

  if (incomingError instanceof SequelizeErrors.ConnectionError) {
    throw new Errors.ApplicationDisabledError(ERROR_MESSAGES.UNDER_MAINTENANCE)
  }

  response.status(error.status).json(error)
}
