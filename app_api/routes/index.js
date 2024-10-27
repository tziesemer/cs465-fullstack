const express = require('express'); // Express app
const router = express.Router();  // Router logic
const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    // console.log('In middleware');
    const authHeader = req.headers['authorization'];
    console.log('Auth header: ' +  authHeader);

    if(authHeader == null){
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1){
        console.log("Not enough tolkens in Auth Header: " + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);
    
    // if(token == null){
    //     console.log('Null Bearer token');
    //     return res.sendStatus(401);
    // }

    //console.log(process.env.JWT_SECRET);
    //console.log(jwt.decode(token));
    const verified = jwt.verify(authHeader, process.env.JWT_SECRET, (err, verified) => {
        if(err){
            console.log('didnt match token');
             return res.sendStatus(401).json('Token Validation Error!');
        }
        req.authorization = verified;
        console.log('token accepted')
    });

    next(); // We need to continue or this will hang forever

}

// This is where we import the controllers we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// define routes for authentication
router
    .route('/login')
    .post(authController.login);
router
    .route('/register')
    .post(authController.register);
    
// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET Method routes tripsFindByCode = requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);

module.exports = router;