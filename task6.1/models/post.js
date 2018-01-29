var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  text: String,
  author: String
});

module.exports = mongoose.model('Post', PostSchema);