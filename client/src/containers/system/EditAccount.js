import React, { useState } from "react";
import { InputReadOnly, InputFormV2, Button } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../../assets/default-user.png";
import { apiUpdateUser } from "../../services";
import { fileToBase64, blobToBase64 } from "../../ultils/Common/toBase64";
import { getCurrent } from "../../store/actions";
import Swal from "sweetalert2";
import title from "../../ultils/title";
import icons from "../../ultils/icons";

const { MdClear } = icons;

const EditAccount = () => {
  const { currentData } = useSelector((state) => state.user);
  title(
    `#${currentData?.id
      ?.match(/\d/g)
      .join("")
      .slice(0, 10)} - Thông tin cá nhân`
  );
  const dispatch = useDispatch();
  const [showAvatar, setShowAvatar] = useState(false);
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avatar: blobToBase64(currentData?.avatar) || "",
    fbUrl: currentData?.fbUrl || "",
    zalo: currentData?.zalo || "",
  });

  const handleSubmit = async () => {
    const response = await apiUpdateUser(payload);
    if (response?.data.err === 0) {
      Swal.fire(
        "Done",
        "Chỉnh sửa thông tin cá nhân thành công",
        "success"
      ).then(() => {
        dispatch(getCurrent());
      });
    } else {
      Swal.fire(
        "Oops!",
        "Chỉnh sửa thông tin cá nhân không thành công",
        "error"
      );
    }
  };
  const handleUpLoadFile = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setPayload((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl w-full text-start font-medium py-4 border-b border-gray-200">
        Thông tin cá nhân
      </h1>
      <div className="w-3/5 flex items-center justify-center flex-auto">
        <div className="py-6 flex flex-col gap-4 w-full">
          <InputReadOnly
            value={
              `#${currentData?.id?.match(/\d/g).join("").slice(0, 10)}` || ""
            }
            direction="flex-row"
            lable={"Mã thành viên:"}
          />
          <InputReadOnly
            value={currentData?.phone}
            direction="flex-row"
            lable={"Số điện thoại:"}
          />
          <InputFormV2
            setValue={setPayload}
            name="name"
            lable={"Tên hiển thị:"}
            direction="flex-row"
            value={payload.name}
          />
          <InputFormV2
            setValue={setPayload}
            name="zalo"
            lable={"Zalo:"}
            direction="flex-row"
            value={payload.zalo}
          />
          <InputFormV2
            setValue={setPayload}
            name="fbUrl"
            lable={"Facebook:"}
            direction="flex-row"
            value={payload.fbUrl}
          />
          <div className="flex">
            <label className="w-[200px] flex-none" htmlFor="password">
              Ảnh đại diện:
            </label>
            <div className="flex flex-col justify-center gap-4 relative">
              <div className="avatar">
                <div className="w-32 rounded-full shadow-md border border-gray-300">
                  <img
                    src={payload.avatar || Avatar}
                    alt="avatar"
                    className="w-10 rounded-full shadow-md"
                  />
                </div>
              </div>
              {payload.avatar && (
                <div
                  onClick={() => setShowAvatar(true)}
                  className="w-32 h-32 text-transparent hover:bg-overlay-70 hover:text-white transition-all rounded-full absolute top-0 flex items-center justify-center cursor-pointer"
                >
                  <p className="text-center">Phóng to hình ảnh</p>
                </div>
              )}
              <input
                type="file"
                id="avatar"
                className="file-input file-input-sm file-input-bordered file:bg-#1266DD border-#1266DD file:border-#1266DD file-input-primary w-full max-w-xs"
                onChange={handleUpLoadFile}
              />
            </div>
          </div>
          <Button
            text="Cập nhật"
            bgColor="bg-#1266DD"
            textColor="text-white"
            primary
            onClick={handleSubmit}
          />
        </div>
      </div>
      {showAvatar && (
        <div className="fixed w-full h-full top-0 left-0 bg-overlay-70 flex items-center justify-center z-10">
          <span
            onClick={() => setShowAvatar(false)}
            className="p-3 absolute top-0 right-0 cursor-pointer"
          >
            <MdClear color="white" size={30} />
          </span>
          <img
            src={payload?.avatar || Avatar}
            alt="avartar"
            className="h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default EditAccount;
