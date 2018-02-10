// app/models/todo.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title:{
		type: String,
		required: true
	} ,
    completed: {
		type: Boolean,
		required: false,
		default: false
	},
    date: {
		type: Date,
		required: false,
		default: new Date()
	}
});

module.exports = mongoose.model('Todo', TodoSchema);