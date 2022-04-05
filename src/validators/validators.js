import { check } from "express-validator"
import { VALIDATION_MESSAGES } from "./messages.js"

export default {
  verifyPagination: [
    check("limit")
      .optional()
      .trim()
      .isInt({ min: 1, max: 2000 })
      .withMessage(VALIDATION_MESSAGES.INVALID_INPUT_INT),
    check("page")
      .optional()
      .trim()
      .isInt({ min: 1, max: 2000 })
      .withMessage(VALIDATION_MESSAGES.INVALID_INPUT_INT),
  ],
}
