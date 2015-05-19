var app = require('express').Router();
var models = require('../models');
var attractionRouter = app;
var async = require('async');



// GET /days
app.get('/', function (req, res, next) {
    models.Day.find({}, function(err, data){
    	// console.log("THIS IS DATA DATA", data);
    	res.json(data);
    	// next();
    });
});
// POST /days
app.post('/', function (req, res, next) {
	// console.log('DAYSS', req.body);
	models.Day.find({day: parseInt(req.body.day)}, function(err, data){
		// console.log(data);
		if (data.length === 0){
			var newDay = new models.Day(req.body);
    		newDay.save(function(err, data){
    			res.send('Sucessful!')
    		});
		} else {
			data[0].autoUpdate(req.body, function(err, data){res.send('inside');});
			
		}
	})  
});
// GET /days/:id
app.get('/:id', function (req, res, next) {
    // serves a particular day as json
    var id = parseInt(req.params.id);

	models.Day.findOne({day: id}, function(err, data){
		if (!data) res.json({});
	    else {
	    	async.parallel({
				hotels: function(done){
					models.Hotel.findOne({_id: data.hotel}, done)
				},
				restaurants: function(done){
					models.Restaurant.find({_id: {$in: data.restaurants}}, done)
				},
				things: function(done){
					models.ThingToDo.find({_id: {$in: data.thingsToDo}} ,done)
				}, 
			}, function(err, results){
				res.json(results);

			});
	    }
	});

});

// DELETE /days/:id
app.delete('/:id', function (req, res, next) {
    // deletes a particular day
    var id = parseInt(req.params.id);
    models.Day.findOne({day:id}, function(err, data){
    	if(!data) return;
    	else data.remove(function(err){if (err) return; });
    });
});



app.use('/:id', attractionRouter);
// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
	console.log('inside the hotel delete', req.data);
    // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});

module.exports = app;










