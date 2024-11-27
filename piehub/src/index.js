const app = require('./app');
const socketIO = require('socket.io');
const http = require('http');
const socketHandler = require('./socket');
const db = require('./db/db');

// Load the environment variables
require('dotenv').config();


const server = http.createServer(app);
const io = socketIO(server);  // Create a new Socket.IO instance

// Initialize Socket.IO handlers
socketHandler(io);


db.initialize().then(() => {
    server.listen(process.env.PIEHUB_PORT, () => {
        console.log(`PieHub server running on port ${process.env.PIEHUB_PORT}`);
    });
});

// Shutdown the server gracefully when the process is interrupted (CTRL+C) or terminated (SIGTERM)
async function shutdown() {
    console.log('Shutting down PieHub server...');
    await db.close();
    server.close(() => {
        console.log('PieHub server closed');
        process.exit(0);
    });
}


process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
