import { Component, OnInit, ViewChild } from "@angular/core";
import { SignalingService } from "../../services/signaling.service";
import Stream from "webrtc4me/lib/stream";
import WebRTC from "webrtc4me";
import { getLocalVideo } from "webrtc4me/lib/utill";

@Component({
  selector: "app-video-chat",
  templateUrl: "./video-chat.component.html",
  styleUrls: ["./video-chat.component.css"]
})
export class VideoChatComponent implements OnInit {
  @ViewChild("localVideoPlayer") localVideoPlayer: VideoDom;
  roomId: string;
  viewRoomId: string;
  localStream: any;

  constructor(private service: SignalingService) {}

  ngOnInit() {}

  async setVideo(peer: WebRTC) {
    const video = await getLocalVideo();
    const stream = new Stream(peer, { stream: video });
    stream.onStream = stream => {
      this.localStream = stream;
      this.localVideoPlayer.nativeElement.srcObject = this.localStream;
    };
  }

  createRoom() {
    this.service
      .createRoom(this.roomId)
      .subscribe(async peer => this.setVideo(peer));
    this.viewRoomId = this.roomId;
    this.roomId = "";
  }

  joinRoom() {
    this.service
      .joinRoom(this.roomId)
      .subscribe(async peer => this.setVideo(peer));
    this.viewRoomId = this.roomId;
    this.roomId = "";
  }
}
