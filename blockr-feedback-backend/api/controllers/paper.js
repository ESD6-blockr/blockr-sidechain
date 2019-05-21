const express = require("express"),
  app = express(),
  path = require("path"),
  ipfsClient = require("ipfs-http-client"),
  base64_arraybuffer = require("base64-arraybuffer"),
  fs = require("fs"),
  Readable = require("stream").Readable;
Buffer = require("ipfs-http-client").Buffer;

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
// const ipfs = ipfsClient('/ip4/127.0.0.1/tcp/5001');

const ipfs = ipfsClient('127.0.0.1', '5001', { protocol: 'http' });

// TODO: Check metadata of file
// TODO: If not textfile (not exists or image), save file to location and tell user where to find the file
app.get("/:hash", (req, res) => {
  let ipfsHash = req.params.hash;
  ipfs.get(`/ipfs/${ipfsHash}`, (error, file) => {
    fs.writeFile(`${__dirname}/test.pdf`, file[0].content, err => {
      sleep(500).then(() => {
        let filePath = path.join(__dirname, "test.pdf");
        let data = fs.readFileSync(filePath);
        res.contentType("application/pdf");
        res.send(data);
        fs.unlinkSync(filePath);
      });
    });
  });
});

/**
 * POST - adds a paper (file) to the IPFS network.
 */
app.post("/", (request, response) => {
  const base64 = request.body.file.toString();
  const base64Trimmed = base64.split(";base64,").pop();
  fs.writeFile("test.pdf", base64Trimmed, { encoding: "base64" }, err => {
  });
  const buffer = Buffer.from(base64Trimmed, "base64");
  ipfs.add(buffer, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
});

module.exports = app;
