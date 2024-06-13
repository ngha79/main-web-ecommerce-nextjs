import React from "react";
import NavbarAuth from "./_components/NavbarAuth";
import Footer from "@/components/footer/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col pt-12 h-full relative">
      <NavbarAuth />
      <div className="h-full relative pb-12">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
