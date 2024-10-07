export enum MessageType {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  MESSAGE = 'MESSAGE',
  PING = 'PING'
}

export type SocketMessage = {
  content: string;
  senderUsername: string;
  senderSocketId: string;
  socketRoomId: string;
  type: MessageType;
}

export type SocketDTO = {
  socketMessage?: string;
  senderUsername?: string;
  receiverUsername?: string;
  senderSocketId?: string;
  receiverSocketId?: string;
  socketRoomId?: string;
  organizationId?: string;
  categories?: string[];
  messageType: MessageType;
  isForMultipleUsers?: boolean;
}

export type SocketSessionResponse = {
  socketRoomId: string;
  responseEntity: {
    body: string;
    status: number;
  }
}
