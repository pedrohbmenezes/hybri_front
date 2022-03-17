import { SocketService } from './services/socket.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];
  constructor(private chatService: SocketService){
  }
  ngOnInit(){
    this.chatService.receiveChat().subscribe((message: any) => {
      this.messages.push(message);
      console.warn(message)
    });
    this.chatService.getUsers().subscribe((users: any) => {
      this.users = users;
      console.warn(users)
    });
  }
  addChat(){
    this.messages.push(this.message);
    this.chatService.sendChat(this.message);
    this.message = '';
  }

}
