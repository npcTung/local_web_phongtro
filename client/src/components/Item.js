import React, { memo, useState } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import { fomatVietnameseToString } from "../ultils/Common/fomatVietnameseToString";
import { path } from "../ultils/constant";
import moment from "moment";
import "moment/locale/vi";
import Avartar from "../assets/default-user.png";
import { blobToBase64 } from "../ultils/Common/toBase64";

const { GrStar, BsSuitHeartFill, BsSuitHeart } = icons;

const Item = ({
  images,
  user,
  title,
  star,
  description,
  attributes,
  address,
  id,
  createdAt,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const formatTime = (createAt) => {
    moment.locale("vi");
    return moment(createAt).fromNow();
  };

  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++) {
      stars.push(<GrStar className="star-item" size={20} />);
    }
    return stars;
  };

  return (
    <div className="w-full flex py-4 border-t-[1px] border-red-500">
      <div className="w-[35%]">
        <Link
          to={`${path.DETAIL}${fomatVietnameseToString(
            title?.replaceAll("/", "")
          )}/${id}`}
          className="gap-1 relative"
        >
          {images.length > 0 &&
            images
              .filter((i, index) =>
                [...Array(1).keys()].some((i) => i === index)
              )
              ?.map((i, index) => {
                return (
                  <img
                    key={index}
                    src={i}
                    alt="preview"
                    className="w-60 h-60 object-cover rounded-md"
                  />
                );
              })}
          <span className="bg-[rgb(0,0,0,0.6)] text-white rounded-md absolute bottom-1 left-1 px-2 py-[1px] cursor-pointer text-sm">
            {`${images?.length} ảnh`}
          </span>
          <span
            className="absolute bottom-1 right-6 max-2xl:right-1 text-white px-2 py-[1px] cursor-pointer"
            onMouseEnter={() => setIsHoverHeart(true)}
            onMouseLeave={() => setIsHoverHeart(false)}
          >
            {isHoverHeart ? (
              <BsSuitHeartFill size={24} color="red" />
            ) : (
              <BsSuitHeart size={24} />
            )}
          </span>
        </Link>
      </div>
      <div className="w-[65%]">
        <div className="pl-4">
          <div className="text-red-600 font-medium hover:underline cursor-pointer">
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
            <Link
              to={`${path.DETAIL}${fomatVietnameseToString(
                title?.replaceAll("/", "")
              )}/${id}`}
            >
              {title}
            </Link>
          </div>
          <div className="flex items-center justify-between pt-2 gap-2 pr-5">
            <span className="text-[#16c784] font-bold flex-3 text-ellipsis whitespace-nowrap overflow-hidden">
              {attributes?.price}
            </span>
            <span className="flex-1">{attributes?.acreage}</span>
            <span className="cursor-pointer hover:underline flex-3 text-ellipsis whitespace-nowrap overflow-hidden">{`${
              address.split(",")[address.split(",").length - 2]
            }, ${address.split(",")[address.split(",").length - 1]}`}</span>
          </div>
          <div className="w-full px-8 mb-2">
            <p className="text-end text-gray-300">{formatTime(createdAt)}</p>
          </div>
          <p className="text-gray-400 text-sm w-full h-[100px] text-ellipsis overflow-hidden">
            {`${description.slice(0, 50)}...`}
          </p>
          <div className="flex items-center justify-between py-2">
            <div className="avatar flex items-center gap-2">
              <div className="w-8 h-w-8 rounded-full">
                <img src={blobToBase64(user?.avatar) || Avartar} alt="avatar" />
              </div>
              <p className="text-gray-400 text-sm">{user?.name}</p>
            </div>
            <div className="flex flex-col xl:flex-row items-center justify-between gap-1">
              <a
                href={`tel:${user?.phone}`}
                target="_blank"
                className="text-white font-medium capitalize bg-[#60BFF8] border border-[#60BFF8] rounded-md px-2 py-1"
              >
                {`Gọi ${user?.phone}`}
              </a>
              <a
                href={`https://zalo.me/${user?.zalo}`}
                target="_blank"
                className="text-info px-2 py-1 border border-[#60BFF8] rounded-md hover:bg-[#60BFF8] capitalize hover:border-[#60BFF8] hover:text-white"
              >
                Nhắn Zalo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
