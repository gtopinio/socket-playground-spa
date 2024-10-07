import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessageType, SocketDTO, SocketMessage } from "../../models";
import { WebSocketService } from "../../services/sockets/web-socket.service";
import { Observable, Subscription } from "rxjs";
import * as models from "../../models";
import * as library from "../../library";

@Component({
  selector: 'app-socket-user-unit',
  templateUrl: './socket-user-unit.component.html',
  styleUrl: './socket-user-unit.component.scss'
})
export class SocketUserUnitComponent implements OnInit, OnDestroy {
  @Input() socketUserUsername!: string;
  @Input() socketDTO!: SocketDTO;

  socketConnectionObservable! :  Observable<any> | null;
  socketSubscription!: Subscription;
  socketMessage!: string;

  socketMessages: SocketMessage[] = [];

  constructor(
    private _socketService: WebSocketService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  joinConnection() {
    this.socketConnectionObservable = this._socketService.initializeWebSocketConnection(this.socketDTO);
    this.handleConnection();
  }

  handleConnection() {
    if (this.socketConnectionObservable) {
      this.socketSubscription = this.socketConnectionObservable.subscribe((message : SocketMessage) => {
        console.log('WebSocket message received:', message);
        if (message && (message.type === models.MessageType.MESSAGE || message.type === models.MessageType.LEAVE) && message.socketRoomId === this.socketDTO.socketRoomId) {
          this.socketMessages.push(message);
        } else if (message && message.type === models.MessageType.PING && message.socketRoomId === this.socketDTO.socketRoomId) {
          console.log('Received ping:', message);

          const socketPing : SocketMessage = {
            content: message.senderUsername + ' is typing...',
            senderUsername: this.socketDTO.senderUsername as string,
            senderSocketId: this.socketDTO.senderSocketId as string,
            socketRoomId: this.socketDTO.socketRoomId as string,
            type: models.MessageType.PING
          };

          // Check if the ping message already exists in the array
          const pingIndex = this.socketMessages.findIndex((msg) =>
            msg.type === models.MessageType.PING && msg.senderSocketId === message.senderSocketId);

          if (pingIndex !== -1) {
            this.socketMessages[pingIndex] = socketPing;
          }
          else {
            this.socketMessages.push(socketPing);
          }

          console.log('Socket messages:', this.socketMessages);

          this.clearPingMessage(message.senderSocketId);
        }
      });
    }
  }

  clearPingMessage(senderSocketId: string) {
    setTimeout(() => {
      const pingIndex = this.socketMessages.findIndex((msg) =>
        msg.type === models.MessageType.PING && msg.senderSocketId === senderSocketId);

      if (pingIndex !== -1) {
        this.socketMessages.splice(pingIndex, 1);
      }
    }, 500);
  }

  sendMessage() {
    const socketDTO = this._socketService.buildSocketDTO(
      this.socketDTO.senderUsername as string,
      this.socketDTO.senderSocketId as string,
      this.socketDTO.socketRoomId as string,
      this.socketDTO.organizationId as string,
      models.MessageType.MESSAGE as models.MessageType,
      this.socketMessage as string,
      this.socketDTO.isForMultipleUsers as boolean
    );

    console.log('Sending message:', socketDTO);
    this._socketService.sendMessage(socketDTO);
    this.socketMessage = '';
  }

  leaveConnection() {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
      this._socketService.disconnectWebSocketConnection();
      this.socketConnectionObservable = null;
      this.socketMessages = [];
      this.socketMessage = '';
    }
  }

  onInputChange() {
    const socketDTO = this._socketService.buildSocketDTO(
      this.socketDTO.senderUsername as string,
      this.socketDTO.senderSocketId as string,
      this.socketDTO.socketRoomId as string,
      this.socketDTO.organizationId as string,
      models.MessageType.PING as models.MessageType,
      library.STOMP_MESSAGE_PING as string,
      this.socketDTO.isForMultipleUsers as boolean
    );

    this._socketService.sendMessage(socketDTO);
  }

  protected readonly MessageType = MessageType;
}
