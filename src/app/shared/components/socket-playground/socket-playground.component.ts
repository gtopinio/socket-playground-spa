import { Component } from '@angular/core';
import { WebSocketService } from "../../services/sockets/web-socket.service";
import { SocketDTO } from "../../models";
import { v4 as uuidv4 } from 'uuid';
import * as library from "../../library";
import * as models from "../../models";

@Component({
  selector: 'app-socket-playground',
  standalone: true,
  imports: [],
  templateUrl: './socket-playground.component.html',
  styleUrl: './socket-playground.component.scss'
})
export class SocketPlaygroundComponent {

  constructor(
    private _socketService: WebSocketService
  ) { }

  testConnection() {
    const senderSocketId = uuidv4();
    const socketRoomId = uuidv4();

    const testSocketDTO : SocketDTO = {
      senderUsername: 'gtopinio',
      senderSocketId: senderSocketId,
      messageType: models.MessageType.JOIN,
      socketMessage: {
        content: 'Hello World',
        senderUsername: 'gtopinio',
        senderSocketId: senderSocketId,
        socketRoomId: socketRoomId,
        type: models.MessageType.MESSAGE
      },
      socketRoomId: socketRoomId,
      isForMultipleUsers: false
    }
    this._socketService.initializeWebSocketConnection(testSocketDTO);
  }
}
