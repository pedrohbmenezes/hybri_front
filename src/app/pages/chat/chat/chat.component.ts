import { TokenService } from './../../../services/token/token.service';
import { SocketService } from './services/socket.service';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public users: any[] = [];
  public message: string = '';
  public messages: any[] = [];
  constructor(private chatService: SocketService, private tokenService:TokenService){
  }
  ngOnInit() {
    this.chatService.sendUser(this.tokenService.getUser())
    this.chatService.receiveChat().subscribe((message: any) => {
      this.messages.push(message);
    });
    this.chatService.getUsers().subscribe((users: any) => {
      this.users.push(users)
    });
    this.chatService.receiveLike().subscribe((payload: any) => {
      this.messages.map((message, indice) => {
        if (message.id == payload) {
          message.like= "liked"
        }
      })
    });
    this.chatService.userexit().subscribe((payload: any) => {
      this.users.map((user, indice) => {
        if (user.id == payload) {
          this.users.splice(indice,indice)
        }
      })
    });
  }
  addChat(message: any) {
    const payload = {
      id:uuidv4(),
      payload: message.value,
      hour: this.hour(),
      username: this.tokenService.getUser(),
      like: ""
    }
    this.chatService.sendChat(payload);
    message.value = ""
  }
  likedmessage(id:any) {
    const payload = id.value;
    this.chatService.sendLike(payload);
  }
  hour() {
    const date = Date.now()
    let myDate = new Date(date);
    let hour = myDate.getHours();
    let minut = myDate.getMinutes();
    let time = `${hour}:${minut}`
    return time
  }

}
