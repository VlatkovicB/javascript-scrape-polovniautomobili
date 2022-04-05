import { validationResult } from "express-validator"
import Errors from "../errors/errors.js"
import validators from "./validators.js"

const validationErrorHandler = (request, response, next) => {
  const result = validationResult(request)
  const errors = result.mapped()

  if (!result.isEmpty()) {
    const validationFields = Object.keys(errors)
    const firstErrorMessage = errors[validationFields[0]].msg
    throw new Errors.ValidationError(errors, firstErrorMessage)
  } else {
    next()
  }
}

const appendValidationError = (validators) => {
  const newValidators = {}

  Object.keys(validators).map((name) => {
    return (newValidators[name] = [validators[name], validationErrorHandler])
  })

  return newValidators
}

export const val = appendValidationError(validators)
