module.exports = {
    BaseError: require('./BaseError'),
    CommandError: require('./CommandError'),
    
    // Database errors
    ...require('./database'),

    // Player errors
    ...require('./players')
};
