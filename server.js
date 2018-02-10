// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var bodyParser = require('body-parser');
var app = express(); // define our app using express
var morgan = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; // set our port
var mongoose = require('mongoose');
// use mlab mongo database
mongoose.connect('mongodb://nodeapilab:nodeapilab@ds157320.mlab.com:57320/node-api');
// model of Todo
var Todo = require('./models/todo');

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Awesome api!' });
});

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// INICIO Todos routes

router.route('/todos')

// create a todo (accessed at POST http://localhost:8080/api/todos)
.post(function(req, res) {

        var todo = new Todo(req.body); // create a new instance of the Todo model
        // save the todo and check for errors
        todo.save(function(err) {
            if (err)
                res.send(err);

            res.json(todo); // success
        });

    })
    // get all the todos (accessed at GET http://localhost:8080/api/todos)
    .get(function(req, res) {
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);

            res.json(todos);
        });
    });

router.route('/todos/:todo_id')

// get the todo with that id (accessed at GET http://localhost:8080/api/todos/:todo_id)
.get(function(req, res) {
        Todo.findById(req.params.todo_id, function(err, todo) {
            if (err)
                res.send(err);
            res.json(todo);
        });
    })
    .put(function(req, res) {
        // use our Todo model to find the todo we want
        Todo.findById(req.params.todo_id, function(err, todo) {

            if (err)
                res.send(err);

            todo.title = req.body.title; // update the todo info
            todo.completed = req.body.completed;

            // save the todo
            todo.save(function(err) {
                if (err)
                    res.send(err);

                res.json(todo);
            });

        });
    })
    // delete todo by id
    .delete(function(req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);