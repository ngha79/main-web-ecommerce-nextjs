import React from "react";

const Layout = async ({
  children,
  form,
}: {
  children: React.ReactNode;
  form: React.ReactNode;
}) => {
  return (
    <div className="container py-8 px-4 md:px-8 h-full flex gap-4 flex-col md:flex-row">
      {form}
      <div className="flex-1 min-h-screen">{children}</div>
    </div>
  );
};

export default Layout;
