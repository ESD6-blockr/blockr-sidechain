"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require('fs');
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../../src/assets/feedback-icon.png')
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
    var files = fs.readdirSync(__dirname);
    win.webContents.send('getFilesResponse', files);
});
//# sourceMappingURL=main.js.map