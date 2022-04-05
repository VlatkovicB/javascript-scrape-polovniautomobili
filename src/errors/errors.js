import { ERROR_MESSAGES } from "./errorMessages.js"
import { ERROR_SLUGS } from "./errorSlugs.js"

class GlobalError extends Error {
  constructor(message, slug, statusCode = 500, errorCode) {
    super()
    this.message = message
    this.slug = slug
    this.statusCode = statusCode
    this.errorCode = errorCode
  }

  toJSON() {
    return {
      msg: this.message,
      slug: this.slug,
      status: this.statusCode,
      errroCode: this.errorCode,
    }
  }
}

class ValidationError extends GlobalError {
  constructor(
    errors,
    message = ERROR_MESSAGES.VALIDATION_ERROR,
    slug = ERROR_SLUGS.VALIDATION_ERROR,
    statusCode = 422
  ) {
    super(message, slug, statusCode)
    this.errors = errors
  }

  toJSON() {
    return {
      ...super.toJSON(),
      type: "Validation error",
      raw_error: this.errors,
    }
  }
}

class ApplicationDisabledError extends GlobalError {
  constructor(
    message,
    slug = ERROR_SLUGS.APPLICATION_DISABLED,
    statusCode = 503
  ) {
    super(message, slug, statusCode)
  }

  toJSON() {
    return {
      ...super.toJSON(),
      title: ERROR_MESSAGES.UNDER_MAINTENANCE,
      explanation: this.message,
    }
  }
}

export default {
  GlobalError,
  ValidationError,
  ApplicationDisabledError,
}
