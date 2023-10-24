import React, { memo } from "react";

const InputForm = ({
  label,
  type,
  value,
  setValue,
  invalidFields,
  setInvalidFields,
  keyPayload,
}) => {
  return (
    <div>
      <label htmlFor={keyPayload} className="text-sm">
        {label}
      </label>
      <input
        id={keyPayload}
        className="outline-none bg-[#E8F0FE] rounded-md w-full py-2 px-3"
        value={value}
        type={type || "text"}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((i) => i.name === type) && (
        <small className="text-red-500 italic">
          {invalidFields.find((i) => i.name === type)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
