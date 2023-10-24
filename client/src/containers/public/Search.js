import React, { useCallback, useEffect, useState } from "react";
import { SearchItem, Modal } from "../../components";
import icons from "../../ultils/icons";
import { useSelector } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { path } from "../../ultils/constant";

const {
  BsChevronRight,
  HiOutlineSearch,
  TbBuildingSkyscraper,
  MdRoom,
  IoPricetagsOutline,
  BiShapeSquare,
} = icons;
const Search = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const [queries, setQueries] = useState({});
  const [arrMaxMin, setArrMaxMin] = useState({});
  const [defaultText, setDefaultText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { provinces, areas, prices, categories } = useSelector(
    (state) => state.app
  );

  const handlShowModal = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setDefaultText(defaultText);
    setIsShowModal(true);
  };
  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      arrMaxMin && setArrMaxMin((prev) => ({ ...prev, ...arrMaxMin }));
      setIsShowModal(false);
    },
    [isShowModal, queries]
  );
  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Code") || item[0].includes("Number"))
      .filter((item) => item[1]);
    let queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });
    let titleSearch = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"
    } ${queryTextObj.province ? `Tỉnh ${queryTextObj.province}` : ""} ${
      queryTextObj.price ? `giá ${queryTextObj.price}` : ""
    }${queryTextObj.area ? `, diện tích ${queryTextObj.area}` : ""}`;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodesObj).toString(),
      },
      { state: { titleSearch } }
    );
  };

  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setArrMaxMin({});
      setQueries({});
    }
  }, [location]);

  return (
    <>
      <div className="w-4/5 xl:w-3/5 p-[10px] my-3 bg-[#F73] rounded-lg flex-col xl:flex-row flex items-center justify-around gap-2">
        <span
          onClick={() => {
            handlShowModal(categories, "category", "Tìm tất cả");
          }}
          className="xl:flex-1 max-xl:w-full"
        >
          <SearchItem
            IconAfter={<TbBuildingSkyscraper color="rgb(0,0,0)" />}
            text={queries.category}
            defaultText={"Tìm tất cả"}
            fontWeight
            IconBefore={<BsChevronRight color="rgb(0,0,0)" />}
          />
        </span>
        <span
          onClick={() => {
            handlShowModal(provinces, "province", "Toàn quốc");
          }}
          className="xl:flex-1 max-xl:w-full"
        >
          <SearchItem
            IconAfter={
              <MdRoom
                color={`${
                  queries.province ? "rgb(0,0,0)" : "rgb(156, 163, 175)"
                }`}
              />
            }
            text={queries.province}
            defaultText={"Toàn quốc"}
            IconBefore={
              <BsChevronRight
                color={`${
                  queries.province ? "rgb(0,0,0)" : "rgb(156, 163, 175)"
                }`}
              />
            }
          />
        </span>
        <span
          onClick={() => {
            handlShowModal(prices, "price", "Chọn giá");
          }}
          className="xl:flex-1 max-xl:w-full"
        >
          <SearchItem
            IconAfter={
              <IoPricetagsOutline
                color={`${queries.price ? "rgb(0,0,0)" : "rgb(156, 163, 175)"}`}
              />
            }
            text={queries.price}
            defaultText={"Chọn giá"}
            IconBefore={
              <BsChevronRight
                color={`${queries.price ? "rgb(0,0,0)" : "rgb(156, 163, 175)"}`}
              />
            }
          />
        </span>
        <span
          onClick={() => {
            handlShowModal(areas, "area", "Chọn diện tích");
          }}
          className="xl:flex-1 max-xl:w-full"
        >
          <SearchItem
            IconAfter={
              <BiShapeSquare
                color={`${queries.area ? "rgb(0,0,0)" : "rgb(156, 163, 175)"}`}
              />
            }
            text={queries.area}
            defaultText={"Chọn diện tích"}
            IconBefore={
              <BsChevronRight
                color={`${queries.area ? "rgb(0,0,0)" : "rgb(156, 163, 175)"}`}
              />
            }
          />
        </span>
        <button
          type="button"
          onClick={handleSearch}
          className="btn btn-primary btn-sm outline-none py-2 px-4 max-xl:w-full bg-#1266DD text-[13.3px] flex items-center max-xl:text-center xl:justify-between gap-2 text-white font-medium rounded-md border-transparent"
        >
          <HiOutlineSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          content={content}
          name={name}
          handleSubmit={handleSubmit}
          queries={queries}
          arrMaxMin={arrMaxMin}
          defaultText={defaultText}
        />
      )}
    </>
  );
};

export default Search;
