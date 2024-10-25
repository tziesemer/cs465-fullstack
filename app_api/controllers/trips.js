const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register model
const Users = require('../models/users');
const Model = mongoose.model('trips');
const User = mongoose.model('users');

// Get: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model.find({}) // No filter, return all records
    .exec();

    // Uncomment the following line to show results of querey
    // on the console
    // console.log(q);
    
    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);   
    }

};

// Get: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // Return a single record
        .exec();

    // Uncomment the following line to show results of querey
    // on the console
    // console.log(q);
    
    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);   
    }

};

// Post: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to requesting client 
const tripsAddTrip = async(req, res) => {
    if(getUser(req, res).status == 201);
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q)
        {// Database returned no data
            return res
                .status(400)
                .json(err);
        }else{// Return new trip
            return res
                .status(201);
        }

        // Uncomment the following line to show results of operation
        // on console
        // console.log(q);
};

//PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    
    // Uncomment for Debugging
    //console.log(req.params);
    //console.log(req.body);
    if(getUser(req, res).status == 201);
            console.log("made it into update")
    const q = await Model
        .findOneAndUpdate(
            {'code': req.params.tripCode},
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

        if(!q)
            {//Database returns no data
                return res
                    .status(400)
                    .json(err);
            }else{//Return resulting updated trip
                return res
                    .status(201);
            }

            //Uncomment the following line to show results of operation
            //on the console
            //console.log(q);
};

const getUser = async(req, res) => {
    if(req.authorization && req.authorization.email) {
        const q = await User
            .findOne({ 'email': req.authorization.email })
            .exec();
            console.log('Got past mongoose in getUser');
            if (!q) {
                console.log('user not found');
                return res
                    .status(404)
                    .json({"message": "User not found"});
            } else {
                 return res
                .status(201)
                .json(q.name);
            }
    } else {
        return res
            .status(404)
            .json({"message": "User not found"});
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};