const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {type: String, unique: false},
  subtitle: String,
  authors: {type: Array},
  pages: Number,
  description: String,
  categories: {type: Array},
  smallThumbnail: String,
  created_at: Date,
  rented_by: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;