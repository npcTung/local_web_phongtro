import React, { memo } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import { fomatVietnameseToString } from "../ultils/Common/fomatVietnameseToString";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

const { GrNext } = icons;

const ItemSidebar = ({ title, content, isDouble, type }) => {
  const location = useLocation();
  const navigete = useNavigate();

  const handldFilterPost = (code) => {
    navigete({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };

  return (
    <div className="p-4 rounded-md bg-white shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-3">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <Link
                  to={`${fomatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="flex gap-2 items-center border-b border-dashed"
                >
                  <GrNext size={12} />
                  <p className="hover:text-#f60 py-1">{item.value}</p>
                </Link>
              );
            })}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-3">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <div
                  onClick={() => handldFilterPost(item.code)}
                  key={item.code}
                  className="flex gap-2 items-center border-b border-dashed cursor-pointer"
                >
                  <GrNext size={12} />
                  <p className="hover:text-#f60 py-1">{item.value}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
