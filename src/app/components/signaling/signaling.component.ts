import { Component, OnInit } from "@angular/core";
import { SignalingService } from "../../services/signaling.service";
import WebRTC from "../../../lib";

@Component({
  selector: "app-signaling",
  templateUrl: "./signaling.component.html",
  styleUrls: ["./signaling.component.css"]
})
export class SignalingComponent implements OnInit {
  roomId: string;
  viewRoomId: string;
  peer: WebRTC = undefined;

  constructor(private service: SignalingService) {}

  ngOnInit() {}

  createRoom() {
    this.service
      .createRoom(this.roomId)
      .subscribe(async peer => (this.peer = peer));
    this.viewRoomId = this.roomId;
    this.roomId = "";
  }

  joinRoom() {
    this.service
      .joinRoom(this.roomId)
      .subscribe(async peer => (this.peer = peer));
    this.viewRoomId = this.roomId;
    this.roomId = "";
  }
}
