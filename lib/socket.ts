import { io, Socket } from "socket.io-client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(API_BASE_URL, {
      transports: ["websocket"],
      autoConnect: false,
      reconnection: true,
    });
  }

  return socket;
}

export function joinDriverRoom(userId: string) {
  const activeSocket = getSocket();

  if (!activeSocket.connected) {
    activeSocket.connect();
  }

  activeSocket.emit("driver:join", userId);

  return activeSocket;
}