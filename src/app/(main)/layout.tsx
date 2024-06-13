import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col relative top-24 lg:top-36">
      <Navbar />
      <div className="flex-1 flex">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
