module.exports = function(app){

/* @param pubkey 
* Storing the pubkey in sessionStorage for user convenience*/
app.post('/login', function (req, res) {
    console.log(req.body);
    res.send('login') // blockchain api call (bestaat de public key)

    // STEP 1: perform api call to blockchain to check existence of public key
    // STEP 2: verify that private key is derived from entered public key
    // STEP 3: generate token
});

    //other routes..
}