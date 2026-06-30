import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as admin from 'firebase-admin';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Basic in-memory store for connected clients (user_id -> socket_id)
  private activeUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    // In production, extract JWT from client.handshake.auth.token and verify using Firebase Admin
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Remove user from activeUsers map based on socket id
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() payload: { channelId: string; content: string; senderId: string; senderName: string },
    @ConnectedSocket() client: Socket,
  ) {
    // 1. Save message to Firestore for persistence
    const message = {
      ...payload,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    try {
      const docRef = await admin.firestore().collection('messages').add(message);
      
      const broadcastPayload = {
        id: docRef.id,
        ...payload,
        createdAt: new Date().toISOString(),
      };

      // 2. Broadcast to everyone in the channel (or global for now)
      this.server.emit('newMessage', broadcastPayload);
      
      return { event: 'messageStatus', data: { success: true, id: docRef.id } };
    } catch (error) {
      return { event: 'messageStatus', data: { success: false, error: 'Failed to save message' } };
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() payload: { channelId: string; senderName: string; isTyping: boolean },
  ) {
    // Broadcast typing indicator to everyone else
    this.server.emit('userTyping', payload);
  }
}
