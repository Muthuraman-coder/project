const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Contact = require('./contactschema/contact.js');

// express app
const app = express();

//connect to mongodb server
const mdb = "mongodb+srv://chatgpt230:123456sS@ramdatabase1.x85e3.mongodb.net/Ramdatabase1?retryWrites=true&w=majority&appName=Ramdatabase1";
//connect mongoose
mongoose.connect(mdb)
  .then((result) => app.listen(3000 , () => {
    console.log('server port running on 3000')
  }) )
  .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}))
app.use(morgan('dev'));


app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

///create
// //mongoose & mongo to snabox routes
// app.get('/add-contact',(req , res ) => {
//   const addcontact = new Contact({
//         title : 'add new contact',
//         snippet : 'contact name',
//         body : 'about contact'
//   })

//   addcontact.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })
 ///contact store
// app.get('/all-contacts' , (req,res) => {
//   Contact.find()
//     .then((result) => {
//       res.send(result)
//     })
// })


//routes to index
app.get('/', (req, res) => {
    res.redirect('/all-contacts')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//contact data store
 app.get('/all-contacts' , (req,res) => {
   Contact.find()
     .then((result) => {
       res.render('index' , {title : 'All Contacts' , contacts : result} )
     })
 })

 //add contact using post
 app.post('/contacts',(req , res) => {
    const contact = new Contact(req.body)
      contact.save()
        .then((result) => {
          res.redirect('/all-contacts')
        })
 })


 app.get('/contacts-create', (req, res) => {
   res.render('create', { title: 'Create a new contact' });
 });

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
