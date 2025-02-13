import { body, validationResult ,param } from 'express-validator';
import { BadRequestError,NotFoundError } from '../errors/customError.js';
import User3 from '../models/userModels.js';
import Task from '../models/noteModels.js';



import mongoose from 'mongoose';



const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};




export const validateTaskInput = withValidationErrors([
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string'),
    
    body('description')
        .notEmpty()
        .withMessage('Content is required')
        .isString()
        .withMessage('Content must be a string')

    
   
]);



  export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {
      const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
      const task = await Task.findById(value);
      if (!task) throw new NotFoundError(`no task with id ${value}`);
     
    
    }),
  ]);


  export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail() .withMessage('invalid email format')
      .custom(async (email) => {
        const user = await User3.findOne({ email });
        if (user) {
          throw new BadRequestError('email already exists');
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters long'),
    
  ]);


  export const validateLoginInput = withValidationErrors([
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
  ]);




