import { Injectable } from '@angular/core';
import { MessageType, SocketDTO } from "../../models";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import * as library from "../../library";
import { Observable, Subject } from "rxjs";
import { STOMP_SOCKET_SEND_CHAT_MESSAGE } from "../../library";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socketUrl : string = 'http://localhost:8080/ws';
  private stompClient!: CompatClient;

  constructor() { }

  initializeWebSocketConnection(socketDTO: SocketDTO): Observable<any> {
    const socketSubject = new Subject<any>();
    const socket = new SockJS(this.socketUrl);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      console.log('WebSocket connection established');
      this.stompClient.subscribe(library.STOMP_TOPIC + socketDTO.socketRoomId, (response) => {
        const socketResponse = JSON.parse(response.body)
        socketSubject.next(socketResponse);
      })

      if (this.stompClient) {
        this.stompClient.send(library.STOMP_SOCKET_JOIN, {}, JSON.stringify(socketDTO));
      }

    }, (error: any) => {
      console.error('STOMP error:', error);
    });

    return socketSubject.asObservable();
  }

  buildSocketDTO(
    socketUsername: string,
    senderSocketId: string,
    socketRoomId: string,
    organizationId: string,
    messageType: MessageType,
    socketMessage: string,
    isForMultipleUsers: boolean,
  ) : SocketDTO {
    return {
      senderUsername: socketUsername,
      senderSocketId: senderSocketId,
      socketRoomId: socketRoomId,
      organizationId: organizationId,
      messageType: messageType,
      socketMessage: socketMessage,
      isForMultipleUsers: isForMultipleUsers
    }
  }

  sendMessage(socketDTO: SocketDTO) {
    if (this.stompClient) {
      this.stompClient.send(library.STOMP_SOCKET_SEND_CHAT_MESSAGE, {}, JSON.stringify(socketDTO));
    }
  }

  disconnectWebSocketConnection() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('WebSocket connection closed');
      });
    }
  }



}
