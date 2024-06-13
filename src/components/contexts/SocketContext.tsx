"use client";

import { io, Socket } from "socket.io-client";
import { createContext, useState, useEffect } from "react";

import { getSession } from "@/utils/actions/account";

interface SocketContextValue {
  socket: Socket | null;
  token: string | null;
  user: any | null;
  setUser: (user: any) => void;
}

export const SocketContext = createContext<SocketContextValue>({
  socket: null,
  token: null,
  user: null,
  setUser(user) {
    return user;
  },
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getSession();
      setToken(token);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
        extraHeaders: {
          user: JSON.stringify(user),
        },
      });
      setSocket(newSocket);
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, token, user, setUser }}>
      {children}
    </SocketContext.Provider>
  );
};
