import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
const RootLayout = () => {
  return (
    <div>
      <Header/>
      <div className="container">
        <Outlet/>
      </div>
    </div>
  );
};
export default RootLayout;
