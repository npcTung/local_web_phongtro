import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header, Sidebar } from "./";
import { Contact } from "../../components";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <div className="flex flex-row w-full mt-10">
        <Sidebar />
        <div className="w-[17%] shadow-md"></div>
        <main className="w-[83%] h-full p-4 bg-white shadow-md">
          <Outlet />
          <div className="h-[100px]"></div>
          <Contact System />
        </main>
      </div>
    </div>
  );
};

export default System;
