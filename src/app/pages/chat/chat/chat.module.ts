import { SocketService } from './services/socket.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers:[SocketService]
})
export class ChatModule { }
