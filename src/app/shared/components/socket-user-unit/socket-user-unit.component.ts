import { Component, Input } from '@angular/core';
import { SocketDTO } from "../../models";
import { WebSocketService } from "../../services/sockets/web-socket.service";

@Component({
  selector: 'app-socket-user-unit',
  templateUrl: './socket-user-unit.component.html',
  styleUrl: './socket-user-unit.component.scss'
})
export class SocketUserUnitComponent {
  @Input() socketUserUsername!: string;
  @Input() socketDTO!: SocketDTO;

  constructor(
    private _socketService: WebSocketService
  ) { }

  testConnection() {
    this._socketService.initializeWebSocketConnection(this.socketDTO);
  }

}
