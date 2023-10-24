import React from "react";
import { Navigation } from "../public";
import { path } from "../../ultils/constant";

const Header = () => {
  return (
    <div className="w-full flex fixed float-none h-[40px] z-10">
      <div className="flex items-center px-5 font-bold bg-#1266DD text-white w-[17%] float-none">
        <a href={path.HOME} target="_blank">
          Phongtro<span className="text-[#E4012B]">123</span>.com
        </a>
      </div>
      <div className="flex-auto">
        <Navigation isAdmin />
      </div>
    </div>
  );
};

export default Header;
