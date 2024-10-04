import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socketUrl : string = 'http://localhost:8080/ws';

  constructor() { }
}
