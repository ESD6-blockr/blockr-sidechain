module.exports = function (app) {
    app.get('/getAllFeedback', function (req, res) {
        // res.send({'login'})
    });

    /* @param privatekey */
    app.post('/postfeedback', function (req, res) {
        console.log(req.body);
        res.send('login')
        // https://stackoverflow.com/questions/32195310/pass-data-through-to-the-view-in-express
    });

}