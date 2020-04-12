'use strict';
// Application dependencies 
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// const path = require('path');

//Specify a directory for a statis resourses 
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// app.set('views', path.join(__dirname,'views/pages'));
// app.set('views', './views');
app.set('view engine','ejs');

// app.get('/hello', (request, response) => {
//         response.send('hello');
//       });

app.get('/', (req, res) => {
  res.render('pages/index');
  // res.send('hiii');
});





app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});