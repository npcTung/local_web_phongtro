import React, { memo } from "react";
import { Select, InputReadOnly2, InputFormV3 } from "./";
import { useSelector } from "react-redux";

const target = [
  { code: "nam", value: "Nam" },
  { code: "nữ", value: "Nữ" },
  { code: "tất cả", value: "Tất Cả" },
];
const Overview = ({
  payload,
  setPayload,
  invalidFields,
  setInvalidFields,
  isEdit,
}) => {
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);

  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-4">
        <div className="flex-auto">
          <Select
            value={payload.categoryCode}
            setValue={setPayload}
            name="categoryCode"
            options={categories}
            label="Loại chuyên mục"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <div className="flex-auto">
          <InputFormV3
            value={payload.title}
            setValue={setPayload}
            name="title"
            label="Tiêu đề"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <div>
          <label htmlFor="desc">Nội dung mô tả</label>
          <textarea
            id="desc"
            cols="30"
            rows="10"
            className="w-full rounded-md outline-none border border-gray-300 p-2"
            value={payload.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e.target.value }))
            }
            onFocus={() => setInvalidFields([])}
          ></textarea>
          <small className="text-red-500">
            {invalidFields?.some((item) => item.name === "description") &&
              invalidFields?.find((item) => item.name === "description")
                ?.message}
          </small>
        </div>
        <div className={`${isEdit ? "w-1/2" : "w-1/4"} flex flex-col gap-4`}>
          <InputReadOnly2
            label="Thông tin liên hệ"
            value={currentData?.name || currentData?.username}
          />
          <InputReadOnly2 label="Số điện thoại" value={currentData?.phone} />
          <InputFormV3
            value={payload.priceNumber}
            setValue={setPayload}
            name="priceNumber"
            label="Giá cho thuê"
            unit="VND"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputFormV3
            value={payload.areaNumber}
            setValue={setPayload}
            name="areaNumber"
            label="Diện tích"
            unit="m2"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            options={target}
            label="Đối tượng cho thuê"
            value={isEdit ? dataEdit?.overviews?.target : payload.target}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            name="target"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Overview);
