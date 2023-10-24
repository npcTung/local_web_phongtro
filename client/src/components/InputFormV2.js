import React, { memo } from "react";

const InputFormV2 = ({
  lable,
  unit,
  value,
  setValue,
  name,
  small,
  invalidFields,
  direction,
  setInvalidFields,
}) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col"}`}>
      <label className="w-[200px] float-none" htmlFor="title">
        {lable}
      </label>
      <div className="flex flex-auto flex-col items-center gap-4">
        <div className="flex w-full items-center">
          <input
            type="text"
            id="title"
            className={`${
              unit ? "rounded-tl-md rounded-bl-md" : "rounded-md"
            } outline-none border flex-auto border-gray-300 p-2`}
            value={value}
            onChange={(e) =>
              setValue && setValue((prev) => ({
                ...prev,
                [name]: e.target.value,
              }))
            }
            onFocus={() => setInvalidFields && setInvalidFields([])}
          />
          {unit && (
            <span className="p-2 border float-none w-16 flex items-center justify-center rounded-tr-md bg-gray-200">
              {unit}
            </span>
          )}
        </div>
        {invalidFields && invalidFields?.some((item) => item.name === name) && (
          <small className="text-red-500 block w-full">
            {invalidFields && invalidFields?.find((item) => item.name === name)?.message}
          </small>
        )}
      </div>
      {small && <small className="opacity-70 whitespace-normal">{small}</small>}
    </div>
  );
};

export default memo(InputFormV2);
