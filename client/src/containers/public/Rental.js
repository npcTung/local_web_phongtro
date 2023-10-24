import React, { useEffect, useState } from "react";
import { Province, ItemSidebar, RelatedPost } from "../../components";
import { List, Pagination } from "./index";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fomatVietnameseToString } from "../../ultils/Common/fomatVietnameseToString";
import title from "../../ultils/title";

const Rental = () => {
  const { prices, areas, categories } = useSelector((state) => state.app);
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const [categoryCode, setCategoryCode] = useState("none");
  const location = useLocation();

  useEffect(() => {
    const category = categories?.find(
      (item) => `/${fomatVietnameseToString(item.value)}` === location.pathname
    );
    setCategoryCurrent(category);
    if (category) {
      setCategoryCode(category.code);
    }
  }, [location]);
  title(categoryCurrent?.header);

  return (
    <div className="w-full my-3 flex flex-col gap-3 ">
      <div>
        <h1 className="text-3xl font-medium mb-2">{categoryCurrent?.header}</h1>
        <p className="text-[#65676B] text-base">{categoryCurrent?.subheader}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List categoryCode={categoryCode} />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            isDouble={true}
            type="priceCode"
            content={prices}
            title="Xem theo giá"
          />
          <ItemSidebar
            isDouble={true}
            type="areaCode"
            content={areas}
            title="Xem theo diện tích"
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default Rental;
