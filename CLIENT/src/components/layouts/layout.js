import React from "react";
import Header from "./header";
import Footer from "./footer";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main-content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;