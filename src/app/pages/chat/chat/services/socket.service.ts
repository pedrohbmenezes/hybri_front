import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
  }
  sendChat(message:any){
    this.socket.emit('msgToServer', message);
  }
  sendLike(message:any){
    this.socket.emit('likemessage', message);
  }
  sendUser(user:string){
    this.socket.emit('user', user);
  }
  receiveChat(){
    return this.socket.fromEvent('chat');
  }
   receiveLike(){
    return this.socket.fromEvent('like');
   }
  userexit(){
    return this.socket.fromEvent('userexit');
  }
  getUsers(){
    return this.socket.fromEvent('users');
  }
}
