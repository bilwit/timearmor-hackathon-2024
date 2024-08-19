import WebSocket, { EventEmitter } from "ws";
import { Server } from "http";

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
        websocketServer.on('connection', (WsClientConnection, _connectionRequest) => {
          console.log('+ Client Connected');
    
          WsClientConnection.addEventListener('message', (event: any) => {
            if (event) {
              const eventData = JSON.parse(event.data);
    
              switch (eventData?.message) {
                case 'hello':
                  WsClientConnection.send(JSON.stringify({ message: 'world' }));
                default:
                  break;
              }
    
            }
          });
    
        });
      }
    };

  } catch(err) {
    console.log(err);
  }
};
