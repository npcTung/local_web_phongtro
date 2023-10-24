import React, { memo } from "react";

const Button = ({
  text,
  textColor,
  bgColor,
  IcAfter,
  onClick,
  fullWidth,
  error,
  primary,
  IcBefore,
}) => {
  return (
    <button
      type="button"
      className={`py-2 px-4 ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-2 ${
        error && "btn btn-error border-transparent"
      } ${primary && "btn btn-primary border-transparent"}`}
      onClick={onClick}
    >
      <span>{IcBefore && <IcBefore />}</span>
      <span>{text}</span>
      <span>{IcAfter && <IcAfter />}</span>
    </button>
  );
};

export default memo(Button);
