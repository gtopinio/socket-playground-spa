import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketDTO, SocketMessage } from "../../models";
import { WebSocketService } from "../../services/sockets/web-socket.service";
import { Observable, Subscription } from "rxjs";
import * as models from "../../models";

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
        }
      });
    }
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

}
