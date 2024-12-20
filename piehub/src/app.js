const express = require('express');
const apiRoutes = require('./api/routes');

const app = express();

app.use(express.json());
app.use('/api/', apiRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


module.exports = app;
