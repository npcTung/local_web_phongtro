import React, { memo, useState, useEffect } from "react";
import icons from "../ultils/icons";
import { getNumbersArea, getNumbersPrice } from "../ultils/Common/getNumbers";

const { GrLinkPrevious } = icons;

const Modal = ({
  setIsShowModal,
  content,
  name,
  handleSubmit,
  queries,
  arrMaxMin,
  defaultText,
}) => {
  const [activedEl, setActivedEl] = useState("");
  const [present1, setPresent1] = useState(
    name === "price" && arrMaxMin?.priceArr
      ? arrMaxMin?.priceArr[0]
      : name === "area" && arrMaxMin?.areaArr
      ? arrMaxMin.areaArr[0]
      : 0
  );
  const [present2, setPresent2] = useState(
    name === "price" && arrMaxMin?.priceArr
      ? arrMaxMin?.priceArr[1]
      : name === "area" && arrMaxMin?.areaArr
      ? arrMaxMin.areaArr[1]
      : 100
  );

  const handleClickTrack = (e, value) => {
    const strackEl = document.getElementById("strack");
    const strackRect = strackEl.getBoundingClientRect();
    let present = value
      ? value
      : Math.round(((e.clientX - strackRect.left) * 100) / strackRect.width);
    if (Math.abs(present - present1) <= Math.abs(present - present2)) {
      setPresent1(present);
    } else {
      setPresent2(present);
    }
  };
  const convert100toTarget = (present) => {
    return name === "price"
      ? (Math.ceil(Math.round(present * 1.5) / 5) * 5) / 10
      : name === "area"
      ? Math.ceil(Math.round(present * 0.9) / 5) * 5
      : 0;
  };
  const convertto100 = (present) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((present / target) * 100);
  };
  const handleActive = (code, value) => {
    setActivedEl(code);
    let arrMaxMin =
      name === "price" ? getNumbersPrice(value) : getNumbersArea(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setPresent1(0);
        setPresent2(convertto100(1));
      }
      if (arrMaxMin[0] === 20) {
        setPresent1(0);
        setPresent2(convertto100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setPresent1(100);
        setPresent2(100);
      }
    }
    if (arrMaxMin.length === 2) {
      setPresent1(convertto100(arrMaxMin[0]));
      setPresent2(convertto100(arrMaxMin[1]));
    }
  };
  const handleBeforeSubmit = (e) => {
    let min = present1 <= present2 ? present1 : present2;
    let max = present1 <= present2 ? present2 : present1;
    let arrMaxMin = (present1 === present2 && present1 === 100) ? [convert100toTarget(min), 99999] : [convert100toTarget(min), convert100toTarget(max)];

    handleSubmit(
      e,
      {
        [`${name}Number`]: arrMaxMin,
        [name]:
          min !== max
            ? `${convert100toTarget(min)} - ${convert100toTarget(max)} ${
                name === "price" ? "triệu" : name === "area" ? "m2" : ""
              }`
            : `Trên ${convert100toTarget(max)} ${
                name === "price" ? "triệu" : name === "area" ? "m2" : ""
              }`,
      },
      {
        [`${name}Arr`]: (present1 === present2 && present1 === 100) ? [min, 99999] : [min, max],
      }
    );
  };

  useEffect(() => {
    const activeTruckEl = document.getElementById("track-active");
    if (activeTruckEl) {
      if (present2 <= present1) {
        activeTruckEl.style.left = `${present2}%`;
        activeTruckEl.style.right = `${100 - present1}%`;
      } else {
        activeTruckEl.style.left = `${present1}%`;
        activeTruckEl.style.right = `${100 - present2}%`;
      }
    }
  }, [present1, present2]);

  return (
    <div
      onClick={() => {
        setIsShowModal(false);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-2/5 h-[500px] bg-white rounded-md relative"
      >
        <div className="h-[45px] border-b px-4 flex items-center">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
            className="cursor-pointer"
          >
            <GrLinkPrevious size={23} />
          </span>
          <div className="flex items-center justify-center w-full">
            <h3 className="uppercase font-medium">
              {name === "category"
                ? "chọn loại hình cho thuê"
                : name === "province"
                ? "chọn tỉnh thành"
                : name === "price"
                ? "chọn giá"
                : "chọn diện tích"}
            </h3>
          </div>
        </div>
        {(name === "category" || name === "province") && (
          <div className="px-8 py-4 flex flex-col">
            <span className="py-2 border-b">
              <input
                type="radio"
                name={name}
                id="default"
                value={defaultText || ""}
                checked={!queries[`${name}Code`] ? true : false}
                onChange={(e) =>
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code`]: null,
                  })
                }
                className="cursor-pointer"
              />
              <label htmlFor="default" className="px-2 cursor-pointer">
                {defaultText}
              </label>
            </span>
            {content?.map((item) => {
              return (
                <span key={item.code} className="py-2 border-b">
                  <input
                    type="radio"
                    name={name}
                    value={item.code}
                    id={item.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    onChange={(e) =>
                      handleSubmit(e, {
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      })
                    }
                    onClick={(e) =>
                      handleSubmit(e, {
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      })
                    }
                    className="cursor-pointer"
                  />
                  <label htmlFor={item.code} className="px-2 cursor-pointer">
                    {item.value}
                  </label>
                </span>
              );
            })}
          </div>
        )}
        {(name === "price" || name === "area") && (
          <div className="px-8 py-20">
            <div className="flex flex-col items-center justify-center relative">
              <div className="absolute z-30 -top-12 font-semibold text-xl text-#f60">
                {present1 === 100 && present2 === 100
                  ? `Trên ${convert100toTarget(present1)} ${
                      name === "price" ? "triệu +" : "m2"
                    }`
                  : `Từ ${
                      present1 <= present2
                        ? convert100toTarget(present1)
                        : convert100toTarget(present2)
                    } - ${
                      present2 >= present1
                        ? convert100toTarget(present2)
                        : convert100toTarget(present1)
                    } ${name === "price" ? "triệu" : "m2"}`}
              </div>
              <div
                onClick={handleClickTrack}
                id="strack"
                className="slider-track h-[5px] bg-gray-300 rounded-full absolute top-0 bottom-0 w-full"
              ></div>
              <div
                onClick={handleClickTrack}
                id="track-active"
                className="slider-track-active h-[5px] bg-#f60 rounded-full absolute top-0 bottom-0 right-0"
              ></div>
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                value={present1}
                onChange={(e) => {
                  setPresent1(+e.target.value);
                  activedEl && setActivedEl("");
                }}
              />
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                value={present2}
                onChange={(e) => {
                  setPresent2(+e.target.value);
                  activedEl && setActivedEl("");
                }}
              />
              <div className="absolute z-30 top-5 left-0 right-0 flex justify-between items-center">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 0);
                  }}
                  className="cursor-pointer"
                >
                  0
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickTrack(e, 100);
                  }}
                  className="-mr-4 cursor-pointer"
                >
                  {name === "price"
                    ? "15 triệu +"
                    : name === "area"
                    ? "90 m2"
                    : ""}
                </span>
              </div>
            </div>
            <div className="mt-14">
              <h4 className="py-4 font-medium">Chọn nhanh:</h4>
              <div className="flex gap-2 items-center justify-start flex-wrap">
                {content?.map((item) => {
                  return (
                    <button
                      key={item.code}
                      onClick={() => handleActive(item.code, item.value)}
                      className={`px-4 py-2 rounded-md ${
                        item.code === activedEl
                          ? "bg-#1266DD text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {item.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {(name === "price" || name === "area") && (
          <button
            type="button"
            onClick={handleBeforeSubmit}
            className="w-full absolute bottom-0 bg-[#ffa500] py-2 font-medium rounded-bl-md rounded-br-md uppercase"
          >
            Áp dụng
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);
