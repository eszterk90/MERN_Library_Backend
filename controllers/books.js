const Book = require('../models/book.model');

const findAllBooks = (req, res) => {
    Book.find()
    .then(data => {
        console.log('session from books', req.session.user);
        res.json(data)
    })
};

const getSingleBook = (req, res) => {
    Book.findById(req.params.bookId)
        .populate('_id')
        .then(data=>{
            // res.set("location", "https://mern-library-five.vercel.app/")
            // res.json(302, data)
            res.json(data);
            console.log(data);
        })
}

const borrowBook = (req, res) => {
    let book = req.body;
    console.log(book);
    Book.updateOne({_id: book._id}, book)
        .then((data) => {
            res.json(data)
            console.log(data)
    })
}

const returnBook = async (req, res) => {
    let book = req.body;
    const updatedBook = await Book.updateOne({_id: book._id}, {rented_by: null}, {returnOriginal: false})
    res.json(updatedBook)
}

const getBookShelf = (req, res) => {
    Book.find({rented_by: req.params.userid})
     .then((response) => {
        if(response) {
            res.json(response)
        }
        else {
            res.json('no books')
        }
     })
}
 
module.exports = {findAllBooks, getSingleBook, borrowBook, returnBook, getBookShelf}