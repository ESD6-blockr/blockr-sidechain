module.exports = function(app){

    app.get('/getAllFeedback', function (req, res) {
        // res.send({'login'})
    });
    
    /* @param privatekey */
    app.post('/postfeedback', function (req, res) {
        console.log(req.body);
        res.send('login')
    });
    
    }