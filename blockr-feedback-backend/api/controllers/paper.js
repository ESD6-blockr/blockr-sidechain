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
const ipfs = ipfsClient('/ip4/192.168.25.18/tcp/8080');

// TODO: Check metadata of file
// TODO: If not textfile (not exists or image), save file to location and tell user where to find the file
app.get("/:hash", (req, res) => {
  let ipfsHash = req.params.hash;
  console.log(ipfsHash);
  ipfs.get(`/ipfs/${ipfsHash}`, (error, file) => {
    console.log(file);
    fs.writeFile(`${__dirname}/test.pdf`, file[0].content, err => {
      sleep(500).then(() => {
        let filePath = path.join(__dirname, "test.pdf");
        //   // let stat = fs.statSync(filePath);
        //   // response.setHeader("Content-Length", stat.size);
        //   // response.setHeader("Content-Type", "application/pdf");
        //   // response.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
        //   console.log(filePath);
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
  // console.log(request.body);
  // const arrayBuffer = base64_arraybuffer.decode(request.body.file);
  // console.log(arrayBuffer);
  // const s = new Readable();
  // s._read = () => {};
  const base64 = request.body.file.toString();
  const base64Trimmed = base64.split(";base64,").pop();
  // s.push(base64Trimmed);
  // s.push(null)
  fs.writeFile("test.pdf", base64Trimmed, { encoding: "base64" }, err => {
    // ipfs.addFromFs('test.pdf', (err, result) => {
    //   if(err) { throw err }
    //   console.log(result);
    // })
  });
  // // var buffer = new Buffer(base64Trimmed, 'base64');
  const buffer = Buffer.from(base64Trimmed, "base64");
  ipfs.add(buffer, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
});

module.exports = app;
