const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  chapters: { type: Number, required: true },
  rating: { type: Number, min: 1, max: 10, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
