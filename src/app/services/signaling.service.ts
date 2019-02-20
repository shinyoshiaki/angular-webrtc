import { Injectable } from "@angular/core";
import WebRTC from "../../lib";
import client from "socket.io-client";
import { Observable, observable, Subscriber, Subject } from "rxjs";

const url = "https://aqueous-earth-75182.herokuapp.com/";
// process.env.NODE_ENV === "production"
//   ? "https://aqueous-earth-75182.herokuapp.com/"
//   : "http://localhost:20000"

const socket = client.connect(url);

@Injectable({
  providedIn: "root"
})
export class SignalingService {
  public subject = new Subject<WebRTC>();
  public state = this.subject.asObservable();

  createRoom(roomId: string): Observable<WebRTC> {
    const rtc = new WebRTC({ trickle: true });
    socket.emit("create", { roomId });
    socket.on("sdp", (data: { sdp: string }) => {
      rtc.setSdp(data.sdp);
    });

    rtc.signal = sdp => {
      socket.emit("sdp", { sdp, roomId });
    };
    rtc.connect = () => {
      this.subject.next(rtc);
    };
    rtc.addOnData(raw => console.log(raw));
    return this.state;
  }

  joinRoom(roomId: string): Observable<WebRTC> {
    const rtc = new WebRTC({ trickle: true });
    socket.emit("join", { roomId });

    socket.on("join", () => {
      rtc.makeOffer();
    });
    socket.on("sdp", (data: { sdp: string }) => {
      rtc.setSdp(data.sdp);
    });

    rtc.signal = sdp => {
      socket.emit("sdp", { sdp, roomId });
    };
    rtc.connect = () => {
      this.subject.next(rtc);
    };
    rtc.addOnData(raw => console.log(raw));
    return this.state;
  }
}
