import Swal from "sweetalert2";
import { apiRegister, apiLogin } from "../../services/auth";
import actionTypes from "./actionTypes";

export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    if (response?.data.err === 0) {
      Swal.fire("Success", "Đăng ký tài khoản thành công", "success").then(
        () => {
          dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            data: response.data.token,
          });
        }
      );
    } else {
      Swal.fire("Error", "Đăng ký tài khoản thất bại", "error").then(() => {
        dispatch({
          type: actionTypes.REGISTER_FAIL,
          data: response.data.msg,
        });
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response?.data.err === 0) {
      Swal.fire("Success", "Đăng nhập tài khoản thành công", "success").then(
        () => {
          dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            data: response.data.token,
          });
        }
      );
    } else {
      Swal.fire("Error", "Đăng nhập tài khoản thất bại", "error").then(() => {
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          data: response.data.msg,
        });
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT,
    data: null,
  });
};
