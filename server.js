require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

// FAKE DATABASE
let books = [

  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Development",
    available: true,
    rating: 4.8,
    year: 2018
  },

  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    genre: "Finance",
    available: false,
    rating: 4.5,
    year: 1997
  },

  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    available: true,
    rating: 4.7,
    year: 1988
  }
  
];

// HOME ROUTE
app.get("/", (req, res) => {

  res.send("Welcome to Book Library API");

});

// GET ALL BOOKS
app.get("/books", (req, res) => {

  res.json(books);

});

// GET SINGLE BOOK
app.get("/books/:id", (req, res) => {

  const bookId = parseInt(req.params.id);

  const book = books.find(b => b.id === bookId);

  if (!book) {

    return res.status(404).json({
      message: "Book not found"
    });

  }

  res.json(book);

});

// CREATE NEW BOOK
app.post("/books", (req, res) => {

  const newBook = {

    id: books.length + 1,

    title: req.body.title,

    author: req.body.author,

    genre: req.body.genre,

    available: req.body.available,

    rating: req.body.rating,

    year: req.body.year

  };

  books.push(newBook);

  res.status(201).json({

    message: "Book added successfully",

    book: newBook

  });

});

// UPDATE BOOK
app.put("/books/:id", (req, res) => {

  const bookId = parseInt(req.params.id);

  const book = books.find(b => b.id === bookId);

  if (!book) {

    return res.status(404).json({
      message: "Book not found"
    });

  }

  book.title = req.body.title || book.title;

  book.author = req.body.author || book.author;

  book.genre = req.body.genre || book.genre;

  book.available =
    req.body.available !== undefined
      ? req.body.available
      : book.available;

  book.rating = req.body.rating || book.rating;

  book.year = req.body.year || book.year;

  res.json({

    message: "Book updated successfully",

    updatedBook: book

  });

});

// DELETE BOOK
app.delete("/books/:id", (req, res) => {

  const bookId = parseInt(req.params.id);

  const bookExists = books.find(b => b.id === bookId);

  if (!bookExists) {

    return res.status(404).json({
      message: "Book not found"
    });

  }

  books = books.filter(b => b.id !== bookId);

  res.json({

    message: "Book deleted successfully"

  });

});

// FEATURED ROUTE (UNIQUE FEATURE)
app.get("/featured/books", (req, res) => {

  const featuredBooks = books.filter(b => b.rating >= 4.7);

  res.json(featuredBooks);

});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});