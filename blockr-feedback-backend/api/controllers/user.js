const express = require("express");
const keys = require('../../keyStorage');
const bip39 = require('bip39');
const Security = require('../../security/security');
var colors = require('colors');
var app = express();

/* @param pubkey 
* Storing the pubkey in sessionStorage for user convenience */
app.post('/login', async function (req, res) {
    const pubKey = req.body.pubKey;
    const privKey = req.body.privKey;

    // STEP 1: perform api call to blockchain to check existence of public key
    // Because this function doesn't exist yet on the block we mock it by hardcoding some keys in a map
    if (!keys.get(pubKey)) {
        res.status(401);
        res.send('[Unauthorized] Supplied public key is not present in blockr!');
    }

    // STEP 2: verify that private key matches with entered public key
    const message = "blockr blockchain is the best ever made!";
    const signature = await Security.sign(message, privKey);

    // check if decodedMessage is equal to original message (this means privKey en publicKey are related to each other)
    let decodedMessage = await Security.verify(signature, pubKey);
    console.log(`decodedMessage: ${decodedMessage}`.green);

    if (decodedMessage !== message) {
        res.status(401);
        res.send('[Unauthorized] Supplied public/private key pair doesn\'t match!');
    }

    // STEP 3: generate token or something
    res.send('[Authenticated] Login successful!');
});

app.post('/checkpass', async function (req, res) {
    let passphrase = req.body.passphrase;


    let entropy = bip39.mnemonicToEntropy(passphrase);
    // res.send(entropy);

    // const mnemonic = bip39.entropyToMnemonic('128c73c5050bb6cce9ae2fc9bf1ef1e9');
    // console.log(mnemonic);


    let seed = bip39.mnemonicToSeedSync(passphrase).toString('hex');
    res.send(seed);
});

//other routes..

module.exports = app;

