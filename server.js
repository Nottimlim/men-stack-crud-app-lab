// Routes
const express = require('express');
const mongoose = require('mongoose');
const Cat = require('./models/cats.js');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();

// Connect
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

// Middleware
app.use(express.urlencoded({ extended: true }));

app.get('/cats/new', (req, res) => {
  res.render('fruits/new.ejs');
});

app.post('/cats', async (req, res) => {
    const { name, breed, age, description, imageUrl } = req.body;
    const newCat = new Cat({ name, breed, age, description, imageUrl });
    await newCat.save();
    res.redirect('/cats');
  });
  

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
