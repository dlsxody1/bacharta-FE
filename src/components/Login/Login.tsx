import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { useRecoilState } from 'recoil';
import { KakaoToken } from '../../store/store';

const Login = () => {
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const [, setToken] = useRecoilState(KakaoToken);

  const data = qs.stringify({
    grant_type: `authorization_code`,
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: KAKAO_CODE,
    client_secret: CLIENT_SECRET,
  });

  const getKakaoToken = async () => {
    await axios
      .post('https://kauth.kakao.com/oauth/token', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => {
        if (res.data.access_token) {
          localStorage.setItem('access_token', res.data.access_token);
          setToken(res.data.access_token);
        }
      })
      .catch((err) => console.log(err));
    // await axios
    //   .get('http://192.168.0.6:3000/user/sign', {
    //     headers: {
    //       Authorization: kakaoToken || '',
    //     },
    //   })
    //   .then((res) => console.log(res.data));
  };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
  }, []);

  return <></>;
};

export default Login;
