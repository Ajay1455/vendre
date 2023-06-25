import axios from "axios";
import { logOut, loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./AuthAction";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://vendrebackend.vercel.app/server/auth/login", user.data);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logOut());
  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.log("Logout error:", error);
  }
};

export const register = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("https://vendrebackend.vercel.app/server/auth/register", user.requestData);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerFailure());
  }
};
