import { Component, OnInit, ViewChild, Input, OnChanges } from "@angular/core";
import Stream from "webrtc4me/lib/stream";
import WebRTC from "webrtc4me";
import { getLocalVideo } from "webrtc4me/lib/utill";
import { SignalingService } from "../../services/signaling.service";

@Component({
  selector: "app-video-chat",
  templateUrl: "./video-chat.component.html",
  styleUrls: ["./video-chat.component.css"]
})
export class VideoChatComponent implements OnInit {
  @ViewChild("localVideoPlayer") localVideoPlayer: VideoDom;
  localStream: any = undefined;

  constructor(private service: SignalingService) {}

  ngOnInit() {
    this.service.state.subscribe(peer => {
      console.log("peer");
      if (!this.localStream) {
        console.log("setvideo");
        this.setVideo(peer);
      }
    });
  }

  async setVideo(peer: WebRTC) {
    const video = await getLocalVideo();
    const stream = new Stream(peer, { stream: video });
    stream.onStream = stream => {
      this.localStream = stream;
      this.localVideoPlayer.nativeElement.srcObject = this.localStream;
    };
  }
}
