import React, { memo } from "react";
import { Link } from "react-router-dom";
import { path } from "../ultils/constant";

const InputReadOnly = ({ lable, value, direction, editPhone }) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col gap-2"}`}>
      <label
        className="font-medium w-[200px] flex-none"
        htmlFor="exectly-address"
      >
        {lable}
      </label>
      <div className="flex-auto">
        <input
          type="text"
          id="exectly-address"
          readOnly
          className="border border-gray-200 outline-none rounded-md bg-gray-100 p-2 w-full"
          value={value || ""}
        />
        {editPhone && (
          <Link to={`/he-thong/${path.EDIT_PHONE}`} className="text-#1266DD hover:text-#f60 py-4 cursor-pointer text-sm">
            Đổi số điện thoại
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(InputReadOnly);
