const naclFactory = require('js-nacl');

module.exports = function(app){

/* @param pubkey 
* Storing the pubkey in sessionStorage for user convenience*/
app.post('/login', async function (req, res) {
    console.log(req.body);
    res.send('login') // blockchain api call (bestaat de public key)

    // STEP 1: perform api call to blockchain to check existence of public key
    // STEP 2: verify that private key is derived from entered public key
    // STEP 3: generate token

    let signature = req.body.signature;
    let pubKey = req.body.pubKey;

    let result = await verifyAsync(signature, pubKey);
    console.log(result)
});

    //other routes..

  
}

function verifyAsync(signature, pubKey) {
    return new Promise((resolve, reject) => {
      if (!signature || !pubKey) {
        reject(new Error('invalid message'));
      } else {
        naclFactory.instantiate((nacl) => {
          const publicKeyBytes = hexToBytes(pubKey);
          const signatureBytes = hexToBytes(signature);
          // Decode message from packet with public key
          const a = nacl.crypto_sign_open(signatureBytes, publicKeyBytes);
          console.log('AAAAAAAAAAAAAAAAAAa');
          console.log(a)
          const b = nacl.to_hex(a);
          // Convert hex to string
          let message = '';
          for (let i = 0; i < b.length; i += 2) {
            message += String.fromCharCode(parseInt(b.substr(i, 2), 16));
          }
          this.debug(`Message: ${message}`);
          resolve(message);
        });
      }
    });
  };

 function hexToBytes(hex) {
    if (!hex) {
      return new Uint8Array(); // eslint-disable-line no-undef
    }
    const bytes = [];
    for (let i = 0, len = hex.length; i < len; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return new Uint8Array(bytes); // eslint-disable-line no-undef
  };

