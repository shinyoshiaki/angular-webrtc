import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { VideoChatComponent } from "./components/video-chat/video-chat.component";
import { TextChatComponent } from "./components/text-chat/text-chat.component";
import { SignalingComponent } from "./components/signaling/signaling.component";
import { DesktopShareComponent } from "./components/desktop-share/desktop-share.component";

@NgModule({
  declarations: [
    AppComponent,
    VideoChatComponent,
    TextChatComponent,
    SignalingComponent,
    DesktopShareComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
