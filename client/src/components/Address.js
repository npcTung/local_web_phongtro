import React, { memo, useEffect, useState } from "react";
import { Select, InputReadOnly2 } from "./";
import { apiGetPublicProvinces, apiGetPublicDistrict } from "../services/app";
import { useSelector } from "react-redux";

const Address = ({
  setPayload,
  invalidFields,
  setInvalidFields,
  isEdit,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [reset, setReset] = useState(false);
  const { dataEdit } = useSelector((state) => state.post);

  useEffect(() => {
    if (dataEdit && isEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundProvinces =
        provinces.length > 0 &&
        provinces?.find(
          (item) =>
            item.province_name === addressArr[addressArr.length - 1]?.trim()
        );
      setProvince(foundProvinces ? foundProvinces.province_id : "");
    }
  }, [provinces]);

  useEffect(() => {
    if (dataEdit && isEdit) {
      let addressArr = dataEdit?.address?.split(",");
      let foundDistrict =
        districts.length > 0 &&
        districts?.find(
          (item) =>
            item.district_name === addressArr[addressArr.length - 2]?.trim()
        );
      setDistrict(foundDistrict ? foundDistrict.district_id : "");
    }
  }, [districts]);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    setDistrict("");
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);
  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            },`
          : ""
      }${
        province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
      province: province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : "",
    }));
  }, [province, district]);
  return (
    <div>
      <h2 className="font-semiblod text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Select
            type="province"
            value={province}
            setValue={setProvince}
            options={provinces}
            label="Tỉnh/TP"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            reset={reset}
            type="district"
            value={district}
            setValue={setDistrict}
            options={districts}
            label="Quận/Huyện"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <InputReadOnly2
          label="Địa chỉ chính xác"
          value={`${
            district
              ? `${
                  districts?.find((item) => item.district_id === district)
                    ?.district_name
                }, `
              : ""
          }${
            province
              ? provinces?.find((item) => item.province_id === province)
                  ?.province_name
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default memo(Address);
