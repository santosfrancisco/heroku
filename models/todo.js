// app/models/todo.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: String,
    completed: Boolean,
    date: Date
});

module.exports = mongoose.model('Todo', TodoSchema);