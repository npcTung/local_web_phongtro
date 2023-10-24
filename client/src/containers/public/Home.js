import React, { useEffect, useState } from "react";
import Header from "./header";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation, Search } from "./index";
import { Intro, Contact } from "../../components";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../ultils/constant";
import icons from "../../ultils/icons";

const { HiOutlineArrowUp } = icons;

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [100]);

  return (
    <div className="w-full h-full flex flex-col items-center m-auto">
      {isFixed ? (
        <>
          <Header opacity />
          <Navigation Fixed />
        </>
      ) : (
        <>
          <Header />
          <Navigation />
        </>
      )}
      {isLoggedIn &&
        location.pathname !== `/${path.CONTACT}` &&
        location.pathname !== `/${path.HUONG_DAN}` &&
        !location.pathname?.includes(path?.DETAIL) && <Search />}
      <main className="w-4/5 xl:w-3/5 flex flex-col items-start justify-start">
        <Outlet />
      </main>
      <Intro />
      <Contact />
      {isFixed && (
        <a
          href="#"
          className="fixed bottom-3 right-3 p-3 rounded-full bg-#F73859"
        >
          <HiOutlineArrowUp color="white" size={30} />
        </a>
      )}
    </div>
  );
};

export default Home;
