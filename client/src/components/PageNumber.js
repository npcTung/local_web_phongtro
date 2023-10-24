import React, { memo } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useLocation } from "react-router-dom";

const notActive =
  "w-[46px] h-[48px] flex justify-center items-center bg-white hover:bg-gray-300 rounded-md";
const active =
  "w-[46px] h-[48px] flex justify-center items-center bg-[#E13427] hover:opacity-90 text-white rounded-md cursor-pointer";

const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {
  const navigete = useNavigate();
  const [paramSearch] = useSearchParams();
  const location = useLocation();
  let entries = paramSearch.entries();

  const append = (entries) => {
    let params = [];
    paramSearch.append("page", +text);
    for (let entry of entries) {
      params.push(entry);
    }
    let searchParamObject = {};
    params?.forEach((i) => {
      if (
        Object.keys(searchParamObject)?.some(
          (item) => item === i[0] && item !== "page"
        )
      ) {
        searchParamObject[i[0]] = [...searchParamObject[i[0]], i[1]];
      } else {
        searchParamObject = { ...searchParamObject, [i[0]]: [i[1]] };
      }
    });
    return searchParamObject;
  };

  const handleChangePage = () => {
    if (!(text === "...")) {
      setCurrentPage(+text);
      navigete({
        pathname: location.pathname,
        search: createSearchParams(append(entries)).toString(),
      });
    }
  };

  return (
    <div
      className={
        +text === +currentPage
          ? active
          : `${notActive} ${text === "..." ? "cursor-not-allowed" : "cursor-pointer"}`
      }
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
};

export default memo(PageNumber);
