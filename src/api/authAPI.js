import axios from "axios";
import { tokenStorage } from "../storage/storage";

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const LOGOUT_REDIRECT_URI = process.env.REACT_APP_LOGOUT_REDIRECT_URI;

const instance = axios.create({
  baseURL: "https://kauth.kakao.com",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const getKakaoToken = async (data) => {
  const response = await instance.post("/oauth/token", data);
  return response;
};

export const kakaoLogout = async () => {
  await axios.get(
    `/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`
  );
  tokenStorage.remove("access_token");
  alert("로그아웃됨");
};
