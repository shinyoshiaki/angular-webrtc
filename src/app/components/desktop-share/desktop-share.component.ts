import { Component, OnInit, ViewChild } from "@angular/core";
import Stream from "../../../lib/stream";
import WebRTC from "../../../lib";
import { getLocalDesktop } from "webrtc4me/lib/utill";
import { SignalingService } from "../../services/signaling.service";

@Component({
  selector: "app-desktop-share",
  templateUrl: "./desktop-share.component.html",
  styleUrls: ["./desktop-share.component.css"]
})
export class DesktopShareComponent implements OnInit {
  @ViewChild("desktopVideo") localVideoPlayer: VideoDom;
  localStream: any;

  constructor(private service: SignalingService) {}

  ngOnInit() {
    this.service.state.subscribe(peer => {
      if (!this.localStream) {
        setTimeout(() => {
          this.setVideo(peer);
        }, 1000);
      }
    });
  }

  async setVideo(peer: WebRTC) {
    const stream = new Stream(peer, {
      get: peer.isOffer ? getLocalDesktop() : undefined,
      label: "desktop"
    });
    if (peer.isOffer) {
      stream.onLocalStream = stream => {
        this.localStream = stream;
        this.localVideoPlayer.nativeElement.srcObject = this.localStream;
      };
    } else {
      stream.onStream = stream => {
        console.log("desktop stream", stream);
        this.localStream = stream;
        this.localVideoPlayer.nativeElement.srcObject = this.localStream;
      };
    }
  }
}
