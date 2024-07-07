import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { roomKeyState, wsState } from "../store/atoms";

export function useWebSocket(url: string) {
  const [socket, setSocket] = useRecoilState(wsState); // State for WebSocket instance
  const [roomKye, setRoomKey] = useRecoilState(roomKeyState); // State for room key

  useEffect(() => {
    const ws = new WebSocket(url); // Create WebSocket instance

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data);
      console.log(data.params.room);
      setRoomKey(data.params.room); // Update roomKey state based on incoming message
    };

    setSocket(ws); // Set WebSocket instance in Recoil state
    return () => ws.close();
    // Clean-up function: close WebSocket connection on component unmount
  }, [url, setSocket]); // Dependencies array

  return { socket, roomKye }; // Return WebSocket instance and roomKey state
}
