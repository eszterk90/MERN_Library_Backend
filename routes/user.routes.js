const express = require('express');
const router = express.Router();
require('dotenv').config();

const { body } = require('express-validator');
const {createUser, verifyEmail, login, logout} = require('../controllers/users')
const {checkLoggedIn} = require('../middleware/authentication')


router.post('/add', 
    [body('name').isLength({min: 3}).withMessage('Please, fill in your name'),
    body('email').isEmail().withMessage('Please, use a valid email address'),
    body('password').isLength({ min: 6}).withMessage('Please, use a password of at least six characters')],
    createUser
);
router.get('/verify', verifyEmail);
router.post('/login',
    [body('email').isEmail().withMessage("Please, fill in your email address"),
    body('password').isLength({ min: 6}).withMessage("Your password contains at least six characters")],
    login
);
router.get('/logout', checkLoggedIn, logout)
    

module.exports = router;