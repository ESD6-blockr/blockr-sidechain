import { Injectable, ɵConsole } from '@angular/core';
import { IpcRenderer } from 'electron'

//https://malcoded.com/posts/angular-desktop-electron/
@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ipc: IpcRenderer;

  constructor() {
    console.log('constructing')
    if ((<any>window).require) {
      console.log('requiren is mogelijk')
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer
      } catch (error) {
        throw error
      }
    } else {
      console.warn('Could not load electron ipc')
    }
  }

  async getFiles() {
    console.log(this.ipc)
    // return new Promise<string[]>((resolve, reject) => {
    //   this.ipc.once("getFilesResponse", (event, arg) => {
    //     resolve(arg);
    //   });
    //   this.ipc.send("getFiles");
    // });
  }
}
