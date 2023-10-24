import React, { memo } from "react";
import { text } from "../ultils/dataIntrto";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fomatVietnameseToString } from "../ultils/Common/fomatVietnameseToString";
import { Button } from "./";
import { useNavigate } from "react-router-dom";
import { path } from "../ultils/constant";

const { GrStar, AiOutlinePlusCircle } = icons;
const star = [1, 2, 3, 4, 5];

const Intro = () => {
  const { categories } = useSelector((state) => state.app);
  const navigate = useNavigate();

  return (
    <div className="border border-gray-200 bg-white w-4/5 xl:w-3/5 px-20 py-10 my-3 rounded-lg flex-col flex items-center justify-center gap-2 shadow-md">
      <h3 className="font-bold text-lg">{text.title}</h3>
      <p className="text-gray-800 text-center my-4">
        {text.description}
        <span className="text-link">
          {categories?.length > 0 &&
            categories.map((item) => {
              return (
                <Link
                  key={item.code}
                  to={`/${fomatVietnameseToString(item.value)}`}
                  className="text-#1266DD font-medium hover:text-#f60"
                >
                  {`${item.value.toLowerCase()}, `}
                </Link>
              );
            })}
        </span>
        {text.description2}
      </p>
      <div className="flex items-center justify-around w-full">
        {text.statistic.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <h4 className="font-bold text-lg">{item.value}</h4>
              <p className="text-gray-500">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-bold text-lg pt-2">{text.price}</h3>
      <div className="flex items-center justify-center gap-1">
        {star.map((item) => {
          return (
            <span key={item} className="text-#f60">
              <GrStar size={24} />
            </span>
          );
        })}
      </div>
      <p className="text-gray-600 italic text-center">"{text.comment}"</p>
      <span className="text-gray-800">{text.author}</span>
      <h3 className="font-medium text-lg pt-2">{text.question}</h3>
      <p>{text.answer}</p>
      <Button
        text={"Đăng tin ngay"}
        bgColor="bg-#F73859"
        textColor="text-white"
        IcAfter={AiOutlinePlusCircle}
        error
        onClick={() => {
          navigate({
            pathname: `/he-thong/${path.CREATE_POST}`,
          });
        }}
      />
    </div>
  );
};

export default memo(Intro);
