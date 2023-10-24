import React, { useEffect } from "react";
import { apiGetCategories } from "../../services";
import { NavLink } from "react-router-dom";
import { path } from "../../ultils/constant";
import { fomatVietnameseToString } from "../../ultils/Common/fomatVietnameseToString";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const notActive =
  "hover:bg-#F73859 p-10px h-full flex items-center bg-#1266DD hover:transition-all";
const active =
  "hover:bg-#F73859 p-10px h-full flex items-center bg-#F73859 hover:transition-all";

const Navigation = ({ isAdmin, Fixed }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories();
      if (response?.data.err === 0) {
        dispatch(actions.getCategories());
      }
    };
    fetchCategories();
    dispatch(actions.getCategories());
  }, []);

  return (
    <div
      className={`w-full flex items-center ${
        isAdmin ? "justify-start" : "justify-center"
      } bg-#1266DD text-white ${Fixed ? "fixed z-10" : ""}`}
    >
      <div className="w-3/5 flex h-full items-center text-sm font-medium">
        <NavLink
          to={`${path.HOME}`}
          className={({ isActive }) => (isActive ? active : notActive)}
          target={`${isAdmin ? "_blank" : ""}`}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div key={item.code}>
                <NavLink
                  to={`/${fomatVietnameseToString(item.value)}`}
                  className={({ isActive }) => (isActive ? active : notActive)}
                  target={`${isAdmin ? "_blank" : ""}`}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
        <NavLink
          to={path.CONTACT}
          className={({ isActive }) => (isActive ? active : notActive)}
          target={`${isAdmin ? "_blank" : ""}`}
        >
          Liên hệ
        </NavLink>
        <NavLink
          to={`${fomatVietnameseToString("Hướng dẫn")}`}
          className={({ isActive }) => (isActive ? active : notActive)}
          target={`${isAdmin ? "_blank" : ""}`}
        >
          Hướng dẫn
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
