import { Injectable } from "@angular/core";
import WebRTC from "webrtc4me";
import client from "socket.io-client";
import { Observable } from "rxjs";

const url ="https://aqueous-earth-75182.herokuapp.com/";
  // process.env.NODE_ENV === "production"
  //   ? "https://aqueous-earth-75182.herokuapp.com/"
  //   : "http://localhost:20000"

const socket = client.connect(url);

@Injectable({
  providedIn: "root"
})
export class SignalingService {
  constructor() {}

  createRoom(roomId: string): Observable<WebRTC> {
    const rtc = new WebRTC({ trickle: true });
    socket.emit("create", { roomId });

    return new Observable(observer => {
      socket.on("sdp", (data: { sdp: string }) => {
        console.log({ data });
        rtc.setSdp(data.sdp);
      });

      rtc.signal = sdp => {
        console.log({ sdp, roomId });
        socket.emit("sdp", { sdp, roomId });
      };
      rtc.connect = () => {
        console.log("connect");
        observer.next(rtc);
      };
      rtc.addOnData(message => {
        console.log({ message });
      });
    });
  }

  joinRoom(roomId: string): Observable<WebRTC> {
    const rtc = new WebRTC({ trickle: true });
    socket.emit("join", { roomId });

    return new Observable(observer => {
      socket.on("join", () => {
        rtc.makeOffer();
      });
      socket.on("sdp", (data: { sdp: string }) => {
        console.log({ data });
        rtc.setSdp(data.sdp);
      });

      rtc.signal = sdp => {
        console.log({ sdp, roomId });
        socket.emit("sdp", { sdp, roomId });
      };
      rtc.connect = () => {
        console.log("connect");
        observer.next(rtc);
      };
      rtc.addOnData(message => {
        console.log({ message });
      });
    });
  }
}
