const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: String,
  text: String,
  author: String
});

module.exports = mongoose.model('Post', PostSchema);
