import { Component, OnInit, ViewChild } from "@angular/core";
import Stream from "../../../lib/stream";
import WebRTC from "../../../lib";
import { getLocalVideo } from "webrtc4me/lib/utill";
import { SignalingService } from "../../services/signaling.service";

@Component({
  selector: "app-video-chat",
  templateUrl: "./video-chat.component.html",
  styleUrls: ["./video-chat.component.css"]
})
export class VideoChatComponent implements OnInit {
  @ViewChild("localVideoPlayer") localVideoPlayer: VideoDom;
  localStream: any;

  constructor(private service: SignalingService) {}

  ngOnInit() {
    this.service.state.subscribe(peer => {
      if (!this.localStream) {
        this.setVideo(peer);
      }
    });
  }

  async setVideo(peer: WebRTC) {
    const stream = new Stream(peer, {
      get: getLocalVideo(),
      label: "videochat"
    });
    stream.onStream = stream => {
      this.localStream = stream;
      this.localVideoPlayer.nativeElement.srcObject = this.localStream;
    };
  }
}
