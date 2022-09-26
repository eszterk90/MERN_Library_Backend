const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Book = require("../models/book.model");
const Schema = mongoose.Schema;
require("dotenv").config()
const axios = require("axios");


async function seedDB() {
    const uri = process.env.USER_COLLECTION_LINK
    
    mongoose.connect(uri, {
        useNewUrlParser: true
    });


    try {
        await Book.deleteMany({});
        
        const books = [];

        const queries = ['puppy', 'kitten', 'street-art', 'feminist', 'graphic-novel', 'villain', 'music', 'chill', 'dj', 'hitchhiking'];
        
        for(let i = 0; i < queries.length; i++){
            // let randomNum = Math.floor(Math.random() * (bookCovers.length -1));
          const book = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${queries[i]}&key=${processs.env.google_api}`)
            .then((result) => {
                const booksWithCover = result.data.items.filter(book => book.volumeInfo.imageLinks && book.volumeInfo.description)
                booksWithCover.map((book, index) => {
                    let b = {
                        title: book.volumeInfo.title,
                        subtitle: book.volumeInfo.subtitle,
                        authors: book.volumeInfo.authors,
                        pages: book.volumeInfo.pageCount,
                        description: book.volumeInfo.description,
                        categories: book.volumeInfo.categories,
                        smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail,
                        createdAt: Date.now(),
                        rented_by: null
                    }
                        let newBook = new Book(b);
                        books.push(newBook);
                })
            })
                    
        }
        Book.insertMany(books)
        console.log("Seeds successfully implanted in database");
        mongoose.connection.close();
            
        }
        
        catch (err) {
            throw err
        } 
};

seedDB();