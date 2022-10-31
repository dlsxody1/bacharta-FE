import React from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { getKakaoToken } from "../../api/authAPI";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { KakaoToken } from "../../store/store";
import { tokenStorage } from "../../storage/storage";

const Login = () => {
  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const [, setToken] = useRecoilState(KakaoToken);

  const postData = qs.stringify({
    grant_type: `authorization_code`,
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: KAKAO_CODE,
    client_secret: CLIENT_SECRET,
  });

  const query = useQuery(
    ["getToken"],
    () =>
      getKakaoToken(postData).then((res) => {
        tokenStorage.set("access_token", res.data.access_token);
        setToken(res.data.access_token);
      }),
    {
      enabled: !!location.search,
      retry: false,
    }
  );

  return <></>;
};

export default Login;
