import { createContext } from "react";

interface IntWsContext {
  isConnected: boolean,
  socket: WebSocket | undefined,
}

const WsContext = createContext<IntWsContext>({
  isConnected: false,
  socket: undefined,
});

export default WsContext;
