import { Component, OnInit, NgZone } from "@angular/core";
import { SignalingService } from "../../services/signaling.service";
import WebRTC from "../../../lib";

@Component({
  selector: "app-text-chat",
  templateUrl: "./text-chat.component.html",
  styleUrls: ["./text-chat.component.css"]
})
export class TextChatComponent implements OnInit {
  myText = "";
  sharedText = "";
  peer: WebRTC;
  constructor(private service: SignalingService, private zone: NgZone) {}

  ngOnInit() {
    this.service.state.subscribe(peer => {
      peer.addOnData(raw => {
        if (raw.label === "chat") {
          this.zone.run(() => {
            this.sharedText = raw.data;
          });
        }
      });
      this.peer = peer;
    });
  }

  send() {
    if (this.peer) {
      this.peer.send(this.myText, "chat");
    }
  }
}
