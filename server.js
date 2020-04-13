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
  this.title = book.volumeInfo.title;
  this.author = book.volumeInfo.authors[0];
  this.img = book.volumeInfo.imageLinks.smallThumbnail;
  this.description = book.volumeInfo.description;
}

function errorHandler (error,req,res){
  res.status(500).send(error);
}

app.get('*', (req, res) => {
  res.status(404).send('NO SUCH ROUTE!');
})

app.listen(PORT, () => {
  console.log(`Listening on PORT${PORT}`);
});