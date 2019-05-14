const base64ToImage = require("base64-to-image");

module.exports = {
  convertImage: function(file) {
    let base64 = `data:image/png;base64,${file.toString("base64")}`;
    let path = "./api/controllers/";
    return base64ToImage(base64, path, {});
  }
};
