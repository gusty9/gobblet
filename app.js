const express = require('express');
const app = express();
const server = require('http').createServer(app);
const options = {/**/};
const io = require('socket.io')(server, options);
const path = require('path');
const port = 8080;
//set up the static resources directory
app.use(express.static('static'));

/**
 * HTTP GET endpoint for the index webpage
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

io.on('connection', socket => {
    console.log('connected!');
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});