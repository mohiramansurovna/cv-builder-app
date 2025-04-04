const { check } = require('express-validator');

const registerValidator = [
    check('first_name')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    check('last_name')
        .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    check('email')
        .isEmail().withMessage('Invalid email address'),
    check('password')
        .isStrongPassword().withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    check('phone')
        .isNumeric().withMessage('Invalid phone number')
        .isLength({ min: 7, max: 15 }).withMessage('Phone number must be between 7 and 15 digits long'),
    check('address')
        .isLength({ min: 3 }).withMessage('Address must be at least 3 characters long'),
]

const loginValidator = [
    check('email')
    .isEmail().withMessage('Invalid email address'),
    check('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
]
module.exports = { registerValidator, loginValidator }