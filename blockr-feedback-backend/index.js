const express = require('express');
const app = express();
let bodyParser = require('body-parser');

const port = 3002;

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Welcome to back-end of Blockr feedback system!'));

app.post('/login', function (req, res) {
    console.log(req.body);
    res.send('login')
});
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`));