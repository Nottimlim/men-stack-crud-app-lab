// Routes
const express = require('express');
const mongoose = require('mongoose');
const Manga = require('./models/Manga.js');
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

app.get('/manga/new.ejs', (req, res) => {
  res.render('newManga.ejs');
});

app.post('/manga', async (req, res) => {
  const { title, genre, chapters, rating, description, imageUrl } = req.body;
  const newManga = new Manga({ title, genre, chapters, rating, description, imageUrl });
  await newManga.save();
  res.redirect('/manga');
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
