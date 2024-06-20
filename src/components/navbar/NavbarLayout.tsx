"use client";

import React, { useContext, useEffect } from "react";

import { SocketContext } from "../contexts/SocketContext";

interface NavbarLayoutProps {
  children: React.ReactNode;
  user: any | null;
}

const NavbarLayout = ({ children, user }: NavbarLayoutProps) => {
  const { setUser } = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);

  return (
    <nav className="lg:min-h-36 bg-cyan-500 min-h-24 fixed top-0 left-0 z-10 w-full">
      {children}
    </nav>
  );
};

export default NavbarLayout;
