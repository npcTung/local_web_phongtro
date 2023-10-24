import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import validate from "../../ultils/Common/validateFields";
import title from "../../ultils/title";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload, setInvalidFields);
    if (invalids === 0) {
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
    }
  };
  title(isRegister ? "Đăng ký - phongtro.com" : "Đăng nhập - phongtro.com");
  
  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white w-[600px] pt-[30px] pb-[100px] rounded-lg shadow-sm px-5 mt-5">
        <h3 className="font-semibold text-2xl uppercase mb-3">
          {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
        </h3>
        <form className="w-full flex flex-col gap-3">
          {isRegister && (
            <InputForm
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              label={"Họ tên"}
              keyPayload={"name"}
              value={payload.name}
              setValue={setPayload}
            />
          )}
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Số điện thoại"}
            keyPayload={"phone"}
            value={payload.phone}
            setValue={setPayload}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"Mật khẩu"}
            keyPayload={"password"}
            type="password"
            value={payload.password}
            setValue={setPayload}
          />
          <Button
            text={isRegister ? "Đăng ký" : "Đăng nhập"}
            bgColor="bg-#1266DD"
            textColor="text-white"
            fullWidth
            onClick={handleSubmit}
            primary
          />
        </form>
        <div className="flex items-center justify-between mt-3">
          {isRegister ? (
            <small>
              Bạn đã có tài khoản?
              <span
                onClick={() => {
                  setIsRegister(false);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
                className="text-[#1266dd] hover:text-#f60 cursor-pointer"
              >
                Đăng nhập ngay
              </span>
            </small>
          ) : (
            <>
              <small
                onClick={() => {
                  setIsRegister(true);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
                className="text-[#1266dd] hover:text-#f60 cursor-pointer"
              >
                Tạo tài khoản mới
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
