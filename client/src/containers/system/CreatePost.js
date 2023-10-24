import React, { useEffect, useState } from "react";
import { Overview, Address, Button } from "../../components";
import icons from "../../ultils/icons";
import { useSelector } from "react-redux";
import { apiUploadImages, apiCreatePost, apiUpdatePost } from "../../services";
import { getCodes, getCodesArea } from "../../ultils/Common/getCodes";
import validate from "../../ultils/Common/validateFields";
import Swal from "sweetalert2";
import title from "../../ultils/title";

const { BsFillCameraFill, BsTrash3 } = icons;

const CreatePost = ({ isEdit }) => {
  const { currentData } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);
  title(
    `#${currentData?.id?.match(/\d/g).join("").slice(0, 10)} - ${
      isEdit ? "Sửa tin cho thuê" : "Đăng tin cho thuê"
    }`
  );
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: isEdit ? dataEdit?.categoryCode : "",
      title: isEdit ? dataEdit?.title : "",
      priceNumber: isEdit ? dataEdit?.priceNumber * 1000000 : 0,
      areaNumber: isEdit ? dataEdit?.areaNumber : 0,
      images: isEdit ? dataEdit?.images : "",
      address: isEdit ? dataEdit?.address : "",
      priceCode: isEdit ? dataEdit?.priceCode : "",
      areaCode: isEdit ? dataEdit?.areaCode : "",
      description: isEdit ? dataEdit?.description : "",
      target: isEdit ? dataEdit?.target : "",
      province: isEdit ? dataEdit?.province : "",
    };
    return initData;
  });
  let category =
    payload?.categoryCode === "CTCH"
      ? "Cho thuê căn hộ mini"
      : payload?.categoryCode === "CTMB"
      ? "Cho thuê mặt bằng"
      : payload?.categoryCode === "CTPT"
      ? "Phòng trọ, nhà trọ"
      : payload?.categoryCode === "NCT"
      ? "Nhà thuê nguyên căn"
      : "";

  const [imagesPreview, setImagesPreview] = useState([]);
  const { prices, areas, categories } = useSelector((state) => state.app);
  const [invalidFields, setInvalidFields] = useState([]);

  const handleFile = async (e) => {
    e.stopPropagation();
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );

      let response = await apiUploadImages(formData);
      if (response.status === 200)
        images = [...images, response.data.secure_url];
    }
    setImagesPreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({ ...prev, images: [...prev.images, ...images] }));
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };

  const handleSumit = async () => {
    let priceCodeArr = getCodes(
      +payload.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );
    let priceCode = priceCodeArr[0]?.code;
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90);
    let areaCode = areaCodeArr[0]?.code;
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userId: currentData.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || "Tất cả",
      category,
      label: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      } ${payload?.address?.split(",")[0]}`,
    };
    const result = validate(finalPayload, setInvalidFields);
    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;
        console.log(finalPayload)

        const response = await apiUpdatePost(finalPayload);
        console.log(response);
      } else {
        const response = await apiCreatePost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công",
            "Đã thêm bài đăng mới thành công",
            "success"
          ).then(() => {
            setPayload({
              categoryCode: "",
              title: "",
              priceNumber: 0,
              areaNumber: 0,
              images: "",
              address: "",
              priceCode: "",
              areaCode: "",
              description: "",
              target: "",
              province: "",
              category: "",
            });
            setImagesPreview([]);
          });
        } else {
          Swal.fire("Opps!", "Có lỗi gì đó đã xảy ra", "error");
        }
      }
    } else {
      Swal.fire("Opps!", "Có lỗi gì đó xảy ra ở các trường", "error");
    }
  };

  useEffect(() => {
    if (dataEdit && isEdit) {
      let images = JSON.parse(dataEdit?.images?.images);
      images && setImagesPreview(images);
    }
  }, [dataEdit]);

  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>
      <div className="flex">
        <div className="py-4 flex flex-col gap-4 flex-auto">
          <Address
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
            isEdit={isEdit}
          />
          <Overview
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
            isEdit={isEdit}
          />
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <div className="w-full">
              <label
                className="w-full cursor-pointer border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-blue-300 border-dashed rounded-md"
                htmlFor="file"
              >
                <BsFillCameraFill color="#00FFFF" size={100} />
                Thêm ảnh
              </label>
              <input
                onChange={handleFile}
                hidden
                type="file"
                id="file"
                multiple
              />
              <div className="w-full gap-4 items-center">
                {imagesPreview.length > 0 && (
                  <>
                    <h3 className="font-medium">Ảnh đã chọn</h3>
                    <div className="flex gap-4 items-center justify-start flex-wrap">
                      {imagesPreview?.map((item) => {
                        return (
                          <div
                            key={item}
                            className={`relative ${
                              isEdit ? "w-[23%]" : "w-[24%]"
                            } h-40`}
                          >
                            <img
                              src={item}
                              alt="preview"
                              className="w-full h-full object-cover rounded-md"
                            />
                            <span
                              title="Xóa"
                              onClick={() => handleDeleteImage(item)}
                              className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-200 hover:bg-gray-400 rounded-full"
                            >
                              <BsTrash3 />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button
            onClick={handleSumit}
            text={isEdit ? "Sửa dữ liệu" : "Tạo mới"}
            bgColor="bg-green-500"
            textColor="text-white"
            primary
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
