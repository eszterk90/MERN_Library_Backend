const express = require('express');
const router = express.Router();
const {faker} = require('@faker-js/faker');
const {findAllBooks, getSingleBook, borrowBook, returnBook, getBookShelf} = require('../controllers/books')



router.get('/all', findAllBooks)
router.get('/:bookId', getSingleBook)
router.post('/checkout', borrowBook)
router.post('/checkin', returnBook)
router.get('/:userid/shelf', getBookShelf)

module.exports = router;