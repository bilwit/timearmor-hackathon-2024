import { useState, useEffect } from 'react';

export interface ReturnData {
  isConnected: boolean,
  socket?: WebSocket,
}

function useWebSocket(): ReturnData {  
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    try {
      const ws = new WebSocket('ws://' + window.location.hostname + ':999/ws');

      if (ws) {
        ws.onopen = () => {
          setIsConnected(true);
        }

        // ws.onmessage = (e: any) => {
        //   const data = JSON.parse(e?.data);

        //   if (data?.message) {
        //     switch (data.message) {
        //       default:
        //         break;
        //     }
        //   }
        // }
        
        setSocket(ws);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    isConnected,
    socket,
  }
}

export default useWebSocket;
