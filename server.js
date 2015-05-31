// server.js  - Node configuration   
// https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular


// Configure our application
// Connect to our database
// Create our Mongoose models
// Define routes for our RESTful API
// Define routes for our frontend Angular application
// Set the app to listen on a port so we can view it in our browser


    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


    // define model ====================
    var Todo = mongoose.model('Todo', {
        text : String
    })
    
    
    // ROUTES =================================================
    app.get('/api/todos', function(req,res){
        // use mongoose to get all todos in the database
        Todo.find(function(){
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
                
            res.json(todos); // return all todos in JSON format
        });
        
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req,res){
        //create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo){
            if(err)
                res.send(err);
            
            // get and return all the todos after you create another
            Todo.find(function(err, todos){
                if(err)
                    res.send(err)
                res.json(todos);
            });
        });
        
    });

    //delete a todo 
    app.delete('api/todos/:todo_id', function(req,res){
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo){
            if(err)
                res.send(err);
            
            //get and return all the todos after you reate another 
            Todo.find(function(err, todos) {
                if(err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
    
// HTTP Verb	URL	            Description
// GET	    /api/todos	        Get all of the todos
// POST	    /api/todos	        Create a single todo
// DELETE	/api/todos/:todo_id	Delete a single todo

    // add one route to our server.js file for the frontend application
    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
