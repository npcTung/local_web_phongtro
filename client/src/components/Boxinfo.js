import React, { memo } from "react";
import anonAvatar from "../assets/default-user.png";
import icons from "../ultils/icons";

const { BsDot, ImPhone, SiZalo } = icons;
const Boxinfo = ({ userData, avatar }) => {
  return (
    <div className="w-full bg-yellow-400 rounded-md flex flex-col items-center p-4 gap-2 shadow-md">
      <img
        src={avatar || anonAvatar}
        alt="avatar"
        className="avatar rounded-full w-16 h-16 object-cover"
      />
      <h3 className="font-medium text-lg">{userData?.name}</h3>
      <span className="flex items-center">
        <BsDot color="green" size={30} />
        <span>Đang hoạt động</span>
      </span>
      <div className="px-5 py-2 bg-[#13b477] rounded-md flex items-center justify-center gap-1 w-full hover:bg-[#109964] transition-all text-white">
        <span>
          <ImPhone />
        </span>
        <a
          href={`tel:${userData?.phone}`}
          target="_blank"
          className="font-bold hover:underline"
        >
          {userData?.phone}
        </a>
      </div>
      <div className="px-5 py-2 bg-white border border-black rounded-md flex items-center justify-center gap-1 w-full">
        <span className="p-1 border rounded-full bg-#1266DD">
          <SiZalo size={30} color="white" />
        </span>
        <a
          href={`https://zalo.me/${userData?.zalo}`}
          target="_blank"
          className="font-bold hover:underline"
        >
          Nhắn zalo
        </a>
      </div>
    </div>
  );
};

export default memo(Boxinfo);
