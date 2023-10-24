import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { fomatVietnameseToString } from "../ultils/Common/fomatVietnameseToString";

const indexs = [0];
const Sitem = ({ title, price, image, createAt, id }) => {
  const formatTime = (createAt) => {
    moment.locale("vi");
    return moment(createAt).fromNow();
  };

  return (
    <div className="w-full border-b border-gray-300">
      <Link to={`/chi-tiet/${fomatVietnameseToString(title)}/${id}`} className="flex items-center gap-2 py-2">
        {image.length > 0 &&
          image
            .filter((i, index) => indexs.some((i) => i === index))
            ?.map((i, index) => {
              return (
                <div key={index} className="w-[90px] h-[65px]">
                  <img
                    src={i}
                    alt="preview"
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              );
            })}
        <div className="flex flex-col w-full">
          <h3 className="text-blue-600 text-[14px] hover:text-#f60">{`${title?.slice(
            0,
            45
          )}...`}</h3>
          <div className="flex items-center justify-between flex-auto gap-1">
            <span className="font-medium text-[#16c784] text-sm">{price}</span>
            <span className="text-gray-300 text-sm">
              {formatTime(createAt)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(Sitem);
