import React, { memo } from "react";

const InputFormV3 = ({
  label,
  unit,
  value,
  setValue,
  name,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div>
      <label htmlFor="title">{label}</label>
      <div>
        <input
          type="text"
          id="title"
          className={`${
            unit ? "w-4/5 rounded-tl-md rounded-bl-md" : "w-full rounded-md"
          } outline-none  border flex-auto border-gray-300 p-2`}
          value={value}
          onChange={(e) =>
            setValue &&
            setValue((prev) => ({ ...prev, [name]: e.target.value }))
          }
          onFocus={() => setInvalidFields([])}
        />
        {unit && (
          <span className="p-2 border-2 border-gray-300 flex-none w-auto item-center justify-center rounded-tr-md rounded-br-md bg-gray-300 ">
            {unit}
          </span>
        )}
      </div>
      <small className="text-red-500">
        {invalidFields?.some((item) => item.name === name) &&
          invalidFields?.find((item) => item.name === name)?.message}
      </small>
    </div>
  );
};

export default memo(InputFormV3);
