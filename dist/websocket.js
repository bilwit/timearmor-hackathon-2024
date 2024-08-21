"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initialize;
const ws_1 = __importDefault(require("ws"));
function initialize(expressServer) {
    try {
        const websocketServer = new ws_1.default.Server({
            noServer: true,
            path: "/ws",
        });
        expressServer.on("upgrade", (request, socket, head) => {
            websocketServer.handleUpgrade(request, socket, head, (websocket) => {
                websocketServer.emit("connection", websocket, request);
            });
        });
        return (CameraEmitter) => {
            if (websocketServer) {
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
            }
        };
    }
    catch (err) {
        console.log(err);
    }
}
;
