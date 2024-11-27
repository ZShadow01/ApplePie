const express = require('express');


const router = express.Router();


// Import individual route files
const playerRoutes = require('./playerRoutes');


router.use('/player', playerRoutes);


module.exports = router;
