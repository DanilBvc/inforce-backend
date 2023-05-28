import { body } from "express-validator"

export const productCreateValidation = [
  body('name', 'name must be at least 3 characters').isLength({ min: 3 }),
  body('imageUrl', 'bad image format').optional().isString()
]
