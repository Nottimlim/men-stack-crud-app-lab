// Routes
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const Cat = require('./models/cats.js');

// Connect
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

// Routes
app.get('/', (req, res) => { // homepage
    res.render('index.ejs');
  });

app.get('/cats/new', (req, res) => { // Cat form
    // res.send('New Cat Form'); // test site
    res.render('cats/new.ejs');
  });
 
app.get('/cats/:catId', async (req, res) => { // Cat display by ID
    const foundCat = await Cat.findById(req.params.catId);
    res.render('cats/show.ejs', { cat: foundCat });
});

app.get('/cats/:catId/edit', async (req, res) => { // Cat edit form
    const foundCat = await Cat.findById(req.params.catId);
     res.render('cats/edit.ejs', { cat: foundCat });
});

app.put('/cats/:catId', async (req, res) => { // Update cat
    const { name, breed, age, description, imageUrl } = req.body;
    const updatedCat = await Cat.findByIdAndUpdate(req.params.catId, { name, breed, age, description, imageUrl }, { new: true });
    res.redirect(`/cats/${updatedCat.id}`);
});

app.post('/cats', async (req, res) => { // Create cat
    const { name, breed, age, description, imageUrl } = req.body;
    const newCat = new Cat({ name, breed, age, description, imageUrl });
    await newCat.save();
    res.redirect('/cats');
});
    
app.get('/cats', async (req, res) => { // Cat index page
    const allCats = await Cat.find({});
    console.log(allCats);
     res.render('cats/index.ejs', { cat: allCats });
});

