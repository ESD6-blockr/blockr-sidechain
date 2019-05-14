"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require('fs');
var zlib = require('zlib');
var crypto = require("crypto");
var win;
var readStream;
var gzipStream;
var writeStream;
var KEY = crypto.randomBytes(32);
console.log(KEY);
function createWindow() {
    readStream = fs.createReadStream('/home/mike/Documents/Semester 6/Proftaak/blockr-feedback/blockr-feedback/blockr-feedback-frontend/src/app/file.txt');
    gzipStream = zlib.createGzip();
    writeStream = fs.createWriteStream('/home/mike/Documents/Semester 6/Proftaak/blockr-feedback/blockr-feedback/blockr-feedback-frontend/src/app/newfile.txt');
    readStream
        .pipe(gzipStream)
        .pipe(writeStream);
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../../src/assets/feedback-icon.png'),
        webPreferences: { nodeIntegration: true } // is needed to let window use node features
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "../../dist/blockr-feedback-frontend/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.ipcMain.on('getFiles', function (event, arg) {
    console.log('HALLO');
    console.log(__dirname);
    var files = fs.readdirSync(__dirname);
    win.webContents.send('getFilesResponse', files);
});
//# sourceMappingURL=main.js.map