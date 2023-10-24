import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo-phongtro.svg";
import { path } from "../../ultils/constant";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultils/menuManage";
import Avatar from "../../assets/default-user.png";
import { blobToBase64 } from "../../ultils/Common/toBase64";

const {
  AiOutlinePlusCircle,
  FiUserPlus,
  BsBoxArrowInRight,
  BsBoxArrowInLeft,
  BsChevronDown,
  IoGridOutline,
} = icons;

const Header = ({ opacity }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const location = useLocation();
  const headerRef = useRef();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.pathname][searchParam.get("page")]);

  return (
    <header
      className={`w-3/5 flex items-center justify-between ${
        opacity ? "opacity-0" : "opacity-100"
      }`}
      ref={headerRef}
    >
      <a href={path.HOME}>
        <img
          src={logo}
          alt="logo phongtro"
          className="w-[240px] h-[70px] object-cove"
        />
      </a>
      <div className="flex items-center gap-2">
        {!isLoggedIn && (
          <div className="flex items-center gap-2">
            <Button
              text={"Đăng nhập"}
              textColor="text-white"
              IcBefore={FiUserPlus}
              onClick={() => goLogin(false)}
              primary
            />
            <Button
              text={"Đăng ký"}
              textColor="text-white"
              IcBefore={BsBoxArrowInRight}
              onClick={() => goLogin(true)}
              primary
            />
          </div>
        )}
        {isLoggedIn && currentData && Object.keys.length > 0 && (
          <div className="flex items-center gap-2">
            <Link to={`/he-thong/${path.EDIT_ACCOUNT}`}>
              <div className="flex gap-4">
                <div className="avatar">
                  <div className="w-14 rounded-full shadow-md border border-gray-300">
                    <img
                      src={blobToBase64(currentData?.avatar) || Avatar}
                      alt="avatar"
                      className="w-10 rounded-full shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold">{currentData?.name}</span>
                  <span>{currentData?.phone}</span>
                </div>
              </div>
            </Link>
            <div className="relative py-2 px-4 outline-none rounded-md hover:underline flex items-center justify-center gap-2 cursor-pointer">
              <Button
                text={"Quản lý tài khoản"}
                textColor="text-white"
                bgColor="bg-blue-700"
                onClick={() => setIsShowMenu((prev) => !prev)}
                IcAfter={BsChevronDown}
                IcBefore={IoGridOutline}
              />
              {isShowMenu && (
                <div className="absolute z-10 min-w-200px p-4 shadow-lg rounded-lg bg-white top-full right-0 flex flex-col gap-y-2">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        className="hover:underline flex items-center gap-2"
                        key={item?.id}
                        to={item?.path}
                      >
                        {item?.icon}
                        {item?.text}
                      </Link>
                    );
                  })}
                  <span
                    className="cursor-pointer hover:underline flex items-center gap-2"
                    onClick={() => {
                      dispatch(actions.logout());
                      setIsShowMenu(false);
                    }}
                  >
                    <BsBoxArrowInLeft />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        <Link
          to="/he-thong/tao-moi-bai-dang"
          className="flex gap-2 items-center justify-center bg-#F73859 px-4 py-2 rounded-md text-white hover:underline"
        >
          Thêm tin mới
          <AiOutlinePlusCircle />
        </Link>
      </div>
    </header>
  );
};

export default Header;
