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

app.set('view engine', 'ejs')


app.post('/books/:id',(req,res)=>{
  let singular = req.params.id;
  let bookshelf = req.body.bookshelf;
  booksData.forEach(val =>{
      if(singular === val.id){
          
          let SQL = 'INSERT INTO books (title,author,isbn,image_url,description, bookshelf) VALUES ($1,$2,$3,$4,$5,$6,$7);';
          let safeValues = [val.title,val.author,val.isbn,val.image_url,val.description, val.bookshelf];
          client.query(SQL,safeValues)
          .then(data =>{
          })
          let SQL2 = `SELECT * FROM books WHERE id= '${val.id}';`;
          client.query(SQL2)
          .then(data =>{
              res.render('pages/books/details',{details:data.rows[0]});
          })

      }
  })
})

app.get('/books/:id',(req,res)=>{
  let singular = req.params.id;
  let SQL = `SELECT * FROM books WHERE id = '${singular}';`;
          client.query(SQL)
          .then(data =>{
              res.render('pages/books/details',{details:data.rows[0]});
          })
})



app.get('/', (req, res) => {
  let SQL='SELECT *FROM books;';
   return client.query(SQL)
  .then(values =>{ 
     let count =values.rows.length;
    res.render('./pages/index',{Books: values.rows , counter:count});
  });
  
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


function Book(books) {
  this.title = books.volumeInfo.title ? books.volumeInfo.title : "Defult Title";
  this.author = books.volumeInfo.authors[0] ? books.volumeInfo.authors[0] : "Unknown Authors";
  this.image_url = books.volumeInfo.imageLinks.smallThumbnail ? books.volumeInfo.imageLinks.smallThumbnail : "No Image Found";
  this.isbn = books.volumeInfo.industryIdentifiers ? books.volumeInfo.industryIdentifiers[0].identifier : "No ISBN Found";
  this.description = books.volumeInfo.description ? books.volumeInfo.description : "No Description Found";
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
