'use strict';
// Application dependencies 
require('dotenv').config();
const express = require('express');
const app = express();
const superagent=require('superagent');
const pg= require('pg');
const methodOverride = require('method-override');


const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);


//Specify a directory for a statis resourses 
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  let SQL='SELECT *FROM books;';
   return client.query(SQL)
  .then(values =>{ 
     let count =values.rows.length;
    res.render('./pages/index',{Books: values.rows , counter:count});
  });
  
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


app.get('/searches/new', (req, res) => {
  res.render('./pages/searches/new');
});
app.post('/books', addBook);

function addBook(req,res){
  const {image_url, title, author, description, isbn, bookshelf} = req.body;
  const SQL = 'INSERT INTO books (image_url, title, author, description,isbn,bookshelf) VALUES($1, $2, $3 , $4, $5, $6 );'
  const values = [title,author,isbn,image_url,description, bookshelf];
  client.query(SQL,values).then(result =>{
    console.log('done');
     res.redirect('/');  
  }) .catch(err => {
      errorHandler(err, req, res);
  });}
 

  


app.post('/books/:id',(req,res)=>{
  let singular = req.params.id;
  let bookshelf = req.body.bookshelf;
  bookData.forEach(val =>{
      if(singular === val.id){
          
          let SQL = 'INSERT INTO books (title,author,isbn,image_url,description, bookshelf) VALUES ($1,$2,$3,$4,$5,$6,$7);';
          let safeValues = [val.title,val.author,val.isbn,val.image_url,val.description,val.bookshelf];
          client.query(SQL,safeValues)
          .then( data =>{
            console.log('done');
          })
          let SQL2 = `SELECT * FROM books WHERE id={${val.id};`;
          client.query(SQL2)
          .then(data =>{
            console.log(data);
            
              res.render('pages/books/detail',{results: data.rows[0]});

          })

      }
  })
})


app.get('/books/:id',(req,res)=>{
  let singular = req.params.id;
  let SQL = `SELECT * FROM books WHERE id = '${singular}';`;
          client.query(SQL)
          .then(data =>{
              res.render('pages/books/detail',{results:data.rows[0]});
          })
})








app.put('/update/:id',(req,res)=>{
  let singular= req.params.id;
  let {title,author,description,isbn,bookshelf} = req.body;
  let SQL = 'UPDATE books SET title=$1,author=$2,description=$3,isbn=$4,bookshelf=$5 WHERE id=$6;';
  let safeValues = [title,author,description,isbn,bookshelf,singular];
  client.query(SQL,safeValues)
  .then(data =>{
      res.redirect(`/books/${singular}`);
  })
})

app.delete('/delete/:id',(req,res)=>{
  let singular = req.params.id;
  let SQL = 'DELETE FROM books WHERE id=$1;';
  let safeValues= [singular];
  client.query(SQL,safeValues)
  .then(res.redirect('/'));
})


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
