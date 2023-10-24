import React, { useState } from "react";
import { InputForm, Button } from "../../components";
import Swal from "sweetalert2";

const Contact = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    conten: "",
  });
  document.title = "Liên hệ - phongtro.com";

  const handleSubmit = () => {
    payload.name !== "" && payload.phone !== "" && payload.conten !== ""
      ? Swal.fire(
          `Cảm ơn ${payload.name ? payload.name : ""}!`,
          "Phản hồi của bạn đã được chúng tôi ghi nhận",
          "success"
        ).then(() => setPayload({ name: "", phone: "", conten: "" }))
      : Swal.fire(
          "Opps!",
          "Bạn chưa cung cấp thông tin và mô tả cho chúng tôi",
          "error"
        ).then(() =>
          setPayload({
            name: payload.name || "",
            phone: payload.phone || "",
            conten: payload.conten || "",
          })
        );
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold my-6">Liên hệ với chúng tôi</h1>
      <div className=" flex gap-4">
        <div className="flex-1 h-fit bg-linearGradient p-5 rounded-[30px] shadow-md flex flex-col text-white gap-4">
          <h4 className="text-xl font-semibold">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn PhongTro.Com
          </span>
          <span>
            <b>Điện thoại</b>: 0917 686 101
          </span>
          <span>
            <b>Email</b>: cskh.phongtro@gmail.com
          </span>
          <span>
            <b>Zalo</b>: 0917 686 101
          </span>
          <span>
            <b>Viber</b>: 0917 686 101
          </span>
          <span>
            <b>Địa chỉ</b>: LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí
            Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
          </span>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-[30px] p-5">
          <h4 className="font-medium text-xl mb-5">Liên hệ trực tuyến</h4>
          <div className="flex flex-col gap-5">
            <InputForm
              label="HỌ VÀ TÊN CỦA BẠN"
              value={payload.name}
              setValue={setPayload}
              keyPayload="name"
            />
            <InputForm
              label="SỐ ĐIỆN THOẠI"
              value={payload.phone}
              setValue={setPayload}
              keyPayload="phone"
            />
            <div className="flex flex-col">
              <label htmlFor="desc" className="text-sm">
                NỘI DUNG MÔ TẢ
              </label>
              <textarea
                id="desc"
                cols="30"
                rows="3"
                className="bg-[#E8F0FE] rounded-md outline-none py-2 px-3"
                value={payload.conten}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, conten: e.target.value }))
                }
                name="conten"
              ></textarea>
            </div>
            <Button
              text="Gửi liên hệ"
              bgColor="bg-#1266DD"
              primary
              fullWidth
              textColor="text-white"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
