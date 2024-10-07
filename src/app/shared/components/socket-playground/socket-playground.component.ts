import { Component } from '@angular/core';
import * as models from "../../models";
import { SocketDTO } from "../../models";
import { v4 as uuidv4 } from 'uuid';
import * as library from "../../library";

@Component({
  selector: 'app-socket-playground',
  templateUrl: './socket-playground.component.html',
  styleUrl: './socket-playground.component.scss'
})
export class SocketPlaygroundComponent {
  genericSocketRoomId = uuidv4();
  senderSocketId = uuidv4();

  constructor(
  ) { }

  generateJoinSocketDTO(
    socketUsername: string,
  ) : SocketDTO {

    return {
      senderUsername: socketUsername,
      senderSocketId: this.senderSocketId,
      messageType: models.MessageType.JOIN,
      socketMessage: library.STOMP_MESSAGE_JOIN,
      socketRoomId: this.genericSocketRoomId,
      isForMultipleUsers: true
    };
  }
}
