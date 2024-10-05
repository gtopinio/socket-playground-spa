import { Injectable } from '@angular/core';
import { SocketDTO } from "../../models";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import * as library from "../../library";
import * as models from "../../models";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socketUrl : string = 'http://localhost:8080/ws';
  private stompClient!: CompatClient;
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private socketSubject : Subject<any> = new Subject<any>();

  constructor() { }

  initializeWebSocketConnection(socketDTO: SocketDTO): void {
    const socket = new SockJS(this.socketUrl);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.connectionStatus.next(true);
      console.log('WebSocket connection established');
      this.stompClient.subscribe('/topic/' + socketDTO.socketRoomId, (response) => {
        const socketResponse = JSON.parse(response.body)
        this.socketSubject.next(socketResponse);
      })

      if (this.stompClient) {
        this.stompClient.send(library.STOMP_SOCKET_JOIN, {}, JSON.stringify(socketDTO));
      }

    }, (error: any) => {
      console.error('STOMP error:', error);
      this.connectionStatus.next(false);
    });
  }


}
