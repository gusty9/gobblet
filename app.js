const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
//set up the static resources directory
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});