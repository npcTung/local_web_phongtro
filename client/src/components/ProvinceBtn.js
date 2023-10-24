import React, { memo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../ultils/constant";

const ProvinceBtn = ({ name, image, provinceCode }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    const titleSearch = `Cho thuê ${name}, Phòng trọ giá rẻ`;

    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <div
      className="shadow-md hover:shadow-lg rounded-bl-lg rounded-br-lg cursor-pointer"
      onClick={handleOnClick}
    >
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[110px] object-cover rounded-tl-lg rounded-tr-lg"
      />
      <div className="font-medium p-2 text-#1266DD text-center hover:text-#f60 transition-all">
        {name}
      </div>
    </div>
  );
};

export default memo(ProvinceBtn);
