module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('component-connected', (component) => {
            console.log(`${component} component connected`);
        });
    });
};
