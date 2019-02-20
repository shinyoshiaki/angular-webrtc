import { Component, OnInit, OnChanges } from "@angular/core";

@Component({
  selector: "app-text-chat",
  templateUrl: "./text-chat.component.html",
  styleUrls: ["./text-chat.component.css"]
})
export class TextChatComponent implements OnInit, OnChanges {
  sharedText = "";
  constructor() {}

  ngOnInit() {}

  log() {
    console.log(this.sharedText);
  }

  ngOnChanges() {
    console.log(this.sharedText);
  }
}
