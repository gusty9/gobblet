//import statements required for server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const options = {/**/};
const io = require('socket.io')(server, options);
const path = require('path');
const port = 8080;
app.use(express.static('static'));

//variables for the games
const GameBoard = require('./goblet_model.js');
let games = new Map();

/**
 * HTTP GET endpoint for the index webpage
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/create', (req, res) => {
    let id = makeid(4);
    games[id] = new GameBoard(16, 6, 4);
    res.redirect(`${id}`);
});

app.get('/:game_id', (req, res) => {
    console.log(req.params);
    res.sendFile(path.join(__dirname + '/static/goblet_online.html'));
});

io.on('connection', socket => {
    //console.log('connected!');
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

function makeid(length) {
    let result = '';
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}