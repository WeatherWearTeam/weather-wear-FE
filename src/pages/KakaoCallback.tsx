import KakaoApi from "@api/kakaoApi";
import { kakaoIcon } from "@shared/icons";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const REDIRECT_URI = import.meta.env.PROD
        ? import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI_PRODUCTION //프로덕션
        : import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI_LOCAL; //로컬

      const URL = import.meta.env.PROD
        ? `kakao/login` //프로덕션
        : `api/kakao/login`; //로컬

      KakaoApi.post(`${URL}`, {
        code,
        redirectUri: REDIRECT_URI,
      }).then(() => {
        localStorage.setItem("ISLOGGEDIN", "true");
        navigate("/");
      });
    }
  }, [code, navigate]);

  return (
    <LoadingContainer>
      <IconWrapper>{kakaoIcon}</IconWrapper>
      카카오 로그인 중이에요!
    </LoadingContainer>
  );
};

export default KakaoCallback;

const LoadingContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: small;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  background-color: #ffae00;

  svg {
    width: 3rem;
    height: 3rem;
    color: white;
  }
`;
