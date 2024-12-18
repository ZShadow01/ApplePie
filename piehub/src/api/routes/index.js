const express = require('express');


const router = express.Router();


// Import individual route files
const playerRoutes = require('./playerRoutes');
const teamRoutes = require('./teamRoutes');


router.use('/player', playerRoutes);
router.use('/team', teamRoutes);


module.exports = router;
