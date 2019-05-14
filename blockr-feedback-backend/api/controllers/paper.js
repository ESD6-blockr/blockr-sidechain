const express = require("express"),
  app = express(),
  path = require("path"),
  ipfsClient = require("ipfs-http-client"),
  image_convert = require("../../utils/file-converter/image_convert")
    .convertImage,
  fs = require("fs");

const ipfsRead = ipfsClient("192.168.25.18", "8080", { protocol: "http" });
const ipfsWrite = ipfsClient("192.168.25.18", "5001", { protocol: "http" });
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
// const ipfs = ipfsClient('/ip4/192.168.25.18/tcp/5001');

// TODO: Check metadata of file
// TODO: If not textfile (not exists or image), save file to location and tell user where to find the file
app.get("/:hash", (request, response) => {
  let ipfsHash = request.params.hash;
  ipfsRead.cat(ipfsHash, (error, file) => {
    console.log(file);
    if (error) throw error;
    let imageInfo = image_convert(file);
    fs.writeFileSync('test.pdf', file);
    // TODO: Refactor to promise
    sleep(500).then(() => {
      let filePath = path.join(__dirname, imageInfo.fileName);
      response.sendFile('test.pdf', err => {
        if (err) response.status(err.status).end();
      });
      fs.unlinkSync(filePath);
    });
  });
});

/**
 * POST - adds a paper (file) to the IPFS network.
 */
app.post("/", (request, response) => {
  console.log('hey')
});

module.exports = app;
