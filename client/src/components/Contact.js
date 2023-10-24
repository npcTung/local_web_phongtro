import React, { memo } from "react";
import { text } from "../ultils/dataContact";
import { Button } from "./";
import { useNavigate } from "react-router-dom";
import { path } from "../ultils/constant";

const Contact = ({ System }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`border-8 border-dashed border-blue-200 bg-white ${
        System ? "w-full" : "w-4/5 xl:w-3/5"
      } px-20 py-10 my-3 rounded-lg flex-col flex items-center justify-center gap-6`}
    >
      <img
        src={text.image}
        alt="thumbnal"
        className="w-full h-48 object-contain"
      />
      <p>{text.conten}</p>
      <div className="flex items-center justify-around w-full">
        {text.contacts.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <span className="uppercase font-medium text-#f60">
                {item.text}
              </span>
              <span className="font-bold cursor-pointer">{item.phone}</span>
              <span className="font-bold cursor-pointer">{item.zalo}</span>
            </div>
          );
        })}
      </div>
      <Button
        text="Gửi liên hệ"
        bgColor="bg-#1266DD"
        textColor="text-white"
        primary
        onClick={() => {
          navigate({
            pathname: `/${path.CONTACT}`,
          });
        }}
      />
    </div>
  );
};

export default memo(Contact);
