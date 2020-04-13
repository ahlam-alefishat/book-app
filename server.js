'use strict';
// Application dependencies 
require('dotenv').config();
const express = require('express');
const app = express();
const superagent=require('superagent');


const PORT = process.env.PORT || 3000;

//Specify a directory for a statis resourses 
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('pages/index');
});


app.post('/searches', (req, res) => {
  const url = 'https://www.googleapis.com/books/v1/volumes?q=quilting';
  superagent.get(url)
    .then((booksData) => {
            let books = booksData.body.items.map(results => {
        return new Book(results);
      });
      res.render('/pages/searches/show',{book:books})
      // res.status(200).json(books);
    });
});



function Book(book){
  this.title = book.volumeInfo.title;
  this.author = book.volumeInfo.authors[0];
  this.img = book.volumeInfo.imageLinks.smallThumbnail;
  this.description = book.volumeInfo.description;
}


app.get('*', (req, res) => {
  res.status(404).send('NO SUCH ROUTE');
})

app.listen(PORT, () => {
  console.log(`Listening on PORT${PORT}`);
});