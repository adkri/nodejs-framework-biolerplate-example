var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var config = require('./config');
var routes = require('./app/routes.js');
GLOBAL.async = require('async');

//database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

config._models();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(function(req,res,next) {
	
	var us = 'user-agent';
	console.log(req.method + " " + req.url + " "+ req.headers[us] + "\n");
	next();

})


var route = config._routes(routes,function(err,data) {
	//if(err) err;

	console.log(data);
	//assign controller to each
	async.each(data,function(d,next) {
		try{	
			//fix code here [  ]
			//set app.get to url controller and function, other files are fine
			app.get(d.route, require('./app/controllers/'+d.target[0])[d.func]);

			next();
		}catch(e){
			next(e);
		}
	},function(err) {
		if(err) throw err;
	});
	return true;

});

module.exports  = app;