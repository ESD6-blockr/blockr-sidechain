const express = require('express');
const app = express();
let bodyParser = require('body-parser');

const port = 3002;

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to back-end of Blockr feedback system!'));

/* @param pubkey 
* Storing the pubkey in sessionStorage for user convenience*/
app.post('/login', function (req, res) {
    console.log(req.body);
    res.send('login')
});

app.get('/getAllFeedback', function (req, res) {
    // res.send({'login'})
});

/* @param privatekey */
app.post('/postfeedback', function (req, res) {
    console.log(req.body);
    res.send('login')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));