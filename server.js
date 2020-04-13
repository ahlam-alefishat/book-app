'use strict';
// Application dependencies 
require('dotenv').config();
const express = require('express');
const app = express();
const superagent=require('superagent');
const pg= require('pg');


const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);


//Specify a directory for a statis resourses 
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('./pages/index')
});

app.get('/searches/new', (req, res) => {
  res.render('./pages/searches/new');
});

app.post('/searches', (req, res) => {
  let url; 
  if (req.body.radioType === 'title') {
      url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.search}&intitle:${req.body.search}`;
  }
  else if (req.body.radioType === 'author') {
      url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.search}+inauthor:${req.body.search}`;
    }
  superagent.get(url)
  .then(bookData =>{
      let books = bookData.body.items.map( bookObj=>{
          return new Book(bookObj);
      })
      res.render('./pages/searches/show' , {Books:books});
  })
  .catch(error => { errorHandler(error,req,res);
  });


});

function Book(book){
const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = book.title ? book.title : 'Title not available';
  this.author = book.authors ? book.authors[0] : 'Author not available';
  this.isbn = book.industryIdentifiers ? book.industryIdentifiers[0].identifier : 'ISBN not available';
  this.image_url = book.imageLinks ? book.imageLinks.thumbnail : placeholderImage;
  this.description = book.description ? book.description : 'No description';
  this.bookshelf = book.categories ? book.categories[0] : 'Uncategorized';

}


function errorHandler (error,req,res){
  res.status(500).send(error);
}


app.get('*', (req, res) => {
  res.status(404).send('NO SUCH ROUTE!');
});


client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on PORT${PORT}`);
    });
  });
