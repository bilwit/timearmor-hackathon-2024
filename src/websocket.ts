import WebSocket, { EventEmitter } from "ws";
import { request, Server } from "http";

export default function initialize(expressServer: Server) {
  try {
    const websocketServer = new WebSocket.Server({
      noServer: true,
      path: "/ws",
    });
  
    expressServer.on("upgrade", (request, socket, head) => {
      websocketServer.handleUpgrade(request, socket, head, (websocket) => {
        websocketServer.emit("connection", websocket, request);
      });
    });

    return (CameraEmitter: EventEmitter) => {
      if (websocketServer) {

        // http://192.168.3.254:8081/

        websocketServer.on('connection', (WsClientConnection, _connectionRequest) => {
          console.log('+ Client Connected');
    
          // WsClientConnection.addEventListener('message', (event: any) => {
          //   if (event) {
          //     const eventData = JSON.parse(event.data);
    
          //     switch (eventData?.message) {
          //       case 'status':
          //         WsClientConnection.send(JSON.stringify({ message: 'connected' }));
          //       default:
          //         break;
          //     }
    
          //   }
          // });
    
        });

        websocketServer.on('close', () => {
          console.log('+ Client Disconnected');
        });
      }
    };

  } catch(err) {
    console.log(err);
  }
};
