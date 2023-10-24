import React, { memo } from "react";

const SearchItem = ({
  IconBefore,
  IconAfter,
  text,
  defaultText,
  fontWeight,
}) => {
  return (
    <div className="bg-white p-2 px-4 w-full flex items-center justify-between rounded-md text-gray-400 text-[13.3px] cursor-pointer text-start">
      <div className="flex items-center max-xl:justify-center gap-1 w-full">
        <span>{IconAfter}</span>
        <span
          className={`xl:w-[100px] ${text ? "font-medium text-black" : ""} ${
            fontWeight ? "font-medium text-black" : ""
          } overflow-hidden xl:text-ellipsis whitespace-nowrap`}
        >
          {text || defaultText}
        </span>
      </div>
      <span>{IconBefore}</span>
    </div>
  );
};

export default memo(SearchItem);
