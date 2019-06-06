import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
// import * as fs from "fs";
import * as base64_arraybuffer from "base64-arraybuffer";
import { PaperService } from "src/app/services/paper/paper.service";

@Component({
  selector: "app-paper",
  templateUrl: "./paper.component.html",
  styleUrls: ["./paper.component.css"]
})
export class PaperComponent implements OnInit {
  constructor(private paperService: PaperService) {}

  ngOnInit() {}

  fileChanged(event) {
    console.log(event.target.files);
    let fileBuffer;
    let reader = new FileReader();
    reader.onload = () => {
      fileBuffer = reader.result;
      console.log(reader.result);
      // const fileContentAsBase64 = base64_arraybuffer.encode(fileBuffer);
      // console.log(base64_arraybuffer.encode(fileBuffer));
      this.paperService.addPaper(fileBuffer).subscribe(response => {
        console.log(response);
      });
    };
    reader.readAsDataURL(event.target.files[0]);
    if (event.target.files && event.target.files.length) {
      // fs.readFileSync()
      // const file = reader.readAsArrayBuffer(event.target.files[0]);
      // console.log(file);
    }
  }
}
