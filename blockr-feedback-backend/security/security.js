const bip39 = require('bip39');
const naclFactory = require('js-nacl');

class Security {
  /**
     * [sign description]
     * @param  {[json]} message    [description]
     * @param  {[string]} privateKey [description]
     * @return {[Promise]}            [description]
     */
  static sign(message, privateKey) {
    return new Promise((resolve, reject) => {
      if (!message || !privateKey) {
        throw new Error('invalid message');
      } else {
        naclFactory.instantiate((nacl) => {
          try {
            // Convert data to bytestring
            const messagBytes = this.messageToBytes(message);

            // Sign message and package up into packet
            const signatureBin = nacl.crypto_sign(messagBytes, this.hexToBytes(privateKey));
            const signature = nacl.to_hex(signatureBin);

            console.log(`Signature: ${signature}`);

            resolve(signature);
          } catch (err) {
            reject(err);
          }
        });
      }
    });
  }

  /**
   *
   * @param {string} signature
   * @param {string} pubKey
   * @return {string} message
   */
  static verify(signature, pubKey) {
    return new Promise((resolve, reject) => {
      if (!signature | !pubKey) {
        reject(new Error('invalid message'));
      } else {
        naclFactory.instantiate((nacl) => {
          const publicKeyBytes = this.hexToBytes(pubKey);
          const signatureBin = this.hexToBytes(signature);

          // Decode message from packet with public key
          const decodedBytes = nacl.crypto_sign_open(signatureBin, publicKeyBytes);

          if (decodedBytes !== null) {
            const hexString = nacl.to_hex(decodedBytes);

            // Convert hex to string
            let message = '';
            for (let i = 0; i < hexString.length; i += 2) {
              message += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
            }
            console.log(`Message: ${message}`);
            resolve(message);
          } else { 
            resolve(null); // message couldn't be reconstructed
          }

        });
      }
    });
  }

  static messageToBytes(message) {
    return Buffer.from(JSON.stringify(message), 'utf8');
  };

  /**
   * [hexToBytes description]
   * @param  {[string]} hex [description]
   * @return {[array]} byteArray    [description]
   */
  static hexToBytes(hex) {
    if (!hex) {
      return new Uint8Array(); // eslint-disable-line no-undef
    }
    const bytes = [];
    for (let i = 0, len = hex.length; i < len; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return new Uint8Array(bytes); // eslint-disable-line no-undef
  }

}

module.exports = Security;