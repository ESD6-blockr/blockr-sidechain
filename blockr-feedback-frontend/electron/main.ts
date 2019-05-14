import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'

const fs = require('fs')

let win: BrowserWindow;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../../src/assets/feedback-icon.png')
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
    const files = fs.readdirSync(__dirname)
    win.webContents.send('getFilesResponse', files)
  })

