import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'

const fs = require('fs');
const zlib = require('zlib');
const crypto = require("crypto");

let win: BrowserWindow;
let readStream;
let gzipStream;
let writeStream;

const KEY = crypto.randomBytes(32);
console.log(KEY);

function createWindow() {
    readStream = fs.createReadStream('/home/mike/Documents/Semester 6/Proftaak/blockr-feedback/blockr-feedback/blockr-feedback-frontend/src/app/file.txt');
    gzipStream = zlib.createGzip();
    writeStream = fs.createWriteStream('/home/mike/Documents/Semester 6/Proftaak/blockr-feedback/blockr-feedback/blockr-feedback-frontend/src/app/newfile.txt');
    
    readStream
      .pipe(gzipStream)
      .pipe(writeStream);

    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../../src/assets/feedback-icon.png'),
        webPreferences: { nodeIntegration: true } // is needed to let window use node features
    })

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `../../dist/blockr-feedback-frontend/index.html`),
            protocol: 'file:',
            slashes: true,
        })
    )

    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)


ipcMain.on('getFiles', (event, arg) => {
    console.log('HALLO')
    console.log(__dirname)
    const files = fs.readdirSync(__dirname)
    win.webContents.send('getFilesResponse', files)
  })

