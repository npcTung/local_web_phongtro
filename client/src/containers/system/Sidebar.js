import React from "react";
import Avatar from "../../assets/default-user.png";
import { useSelector, useDispatch } from "react-redux";
import menuSidebar from "../../ultils/menuSidebar";
import { Link, NavLink } from "react-router-dom";
import icons from "../../ultils/icons";
import * as actions from "../../store/actions";
import { blobToBase64 } from "../../ultils/Common/toBase64";

const { BsBoxArrowInLeft } = icons;

const Sidebar = () => {
  const { currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="w-[17%] h-full p-4 fixed shadow-md">
      <div className="flex flex-col gap-4">
        <Link to="#">
          <div className="flex gap-4">
            <div className="avatar">
              <div className="w-14 rounded-full shadow-md border-b border-gray-300">
                <img
                  src={blobToBase64(currentData?.avatar) || Avatar}
                  alt="avatar"
                  className="w-10 rounded-full shadow-md"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold">{currentData?.name}</span>
              <small>{currentData?.phone}</small>
            </div>
          </div>
        </Link>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          Mã thành viên:{" "}
          <small className="font-medium">
            {`#${currentData?.id?.match(/\d/g).join("").slice(0, 10)}`}
          </small>
        </span>
      </div>
      <div className="mt-8 border-t border-dashed border-[#d1d1d1]">
        {menuSidebar.map((item) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar font-bold" : "sidebar"
              }
              key={item.id}
              to={item.path}
            >
              {item?.icon}
              {item?.text}
            </NavLink>
          );
        })}
        <span
          className="sidebar cursor-pointer"
          onClick={() => {
            dispatch(actions.logout());
          }}
        >
          <BsBoxArrowInLeft />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
