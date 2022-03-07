/* eslint-disable max-len */
const mongoose = require('mongoose');
/**
 * Book Schema
 */

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ISBN:{
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', BookSchema);
