import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
  }
  sendChat(message:any){
    this.socket.emit('chat', message);
  }
  receiveChat(){
    return this.socket.fromEvent('chat');
  }
  getUsers(){
    return this.socket.fromEvent('users');
  }
}
