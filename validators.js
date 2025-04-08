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

const profileValidator = [
    check('user_id')
        .isUUID().withMessage('Invalid user ID'),
    check('job_title')
        .isLength({ min: 2 }).withMessage('Job title must be at least 2 characters long'),
    check('personal_statement')
        .isLength({ max: 50 }).withMessage('Personal statement must be less than 50 characters long'),
    check('linkedin')
        .optional().isURL().withMessage('Invalid LinkedIn URL'),
    check('github')
        .optional().isURL().withMessage('Invalid GitHub URL'),
    check('portfolio')
        .optional().isURL().withMessage('Invalid portfolio URL'),
]

const educationValidator = [
    check('user_id')
        .isUUID().withMessage('Invalid user ID'),
    check('degree')
        .isLength({ min: 2 }).withMessage('Degree must be at least 2 characters long'),
    check('field_of_study')
        .isLength({ min: 2 }).withMessage('Field of study must be at least 2 characters long'),
    check('institution')
        .isLength({ min: 2 }).withMessage('Institution must be at least 2 characters long'),
    check('location')
        .isLength({ min: 2 }).withMessage('Location must be at least 2 characters long'),
    check('start_date')
        .isDate().withMessage('Invalid start date'),
    check('end_date')
        .isDate().withMessage('Invalid end date'),
    check('description')
        .isLength({ max: 500 }).withMessage('Description must be less than 500 characters long'),
]

const experienceValidator = [
    check('user_id')
        .isUUID().withMessage('Invalid user ID'),
    check('job_title')
        .isLength({ min: 2 }).withMessage('Job title must be at least 2 characters long'),
    check('company_name')
        .isLength({ min: 2 }).withMessage('Company name must be at least 2 characters long'),
    check('start_date')
        .isDate().withMessage('Invalid start date'),
    check('end_date')
        .isDate().withMessage('Invalid end date'),
    check('description')
        .isLength({ max: 500 }).withMessage('Description must be less than 500 characters long'),
]

const skillsValidator = [
    check('user_id')
        .isUUID().withMessage('Invalid user ID'),
    check('skill_name')
        .isLength({ min: 2 }).withMessage('Skill name must be at least 2 characters long'),
    check('skill_level')
        .isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid skill level'),
]
const languageValidator = [
    check('user_id')
        .isUUID().withMessage('Invalid user ID'),
    check('language_name')
        .isLength({ min: 2 }).withMessage('Language name must be at least 2 characters long'),
    check('proficiency_level')
        .isIn(['Native', 'Fluent', 'Intermediate', 'Beginner']).withMessage('Invalid proficiency level'),
]

const settingsValidator=[
    check('first_name')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    check('last_name')
        .isLength({min:3}).withMessage('Last name must be at least 3 characters long '),
    check('email')
        .isEmail().withMessage("Email is not valid"),
    check('password')
        .isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    check('new_password')
        .isLength({min:6}).withMessage('New password must be at least 6 characters long'),
    check('confirm_password')
        .isLength({min:6}).withMessage('Confirm password must be at least 6 characters long'),
    check('new_password')
        .custom((value, { req }) => {
            if (value !== req.body.confirm_password) {
                throw new Error('New password and confirm password do not match');
            }
            return true;
        }),
]
module.exports = {
    registerValidator,
    loginValidator,
    profileValidator,
    educationValidator,
    experienceValidator,
    skillsValidator,
    languageValidator,
    settingsValidator
}