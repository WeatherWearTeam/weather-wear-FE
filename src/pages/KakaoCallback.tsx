// import api from "@api/api";
import api from "@api/api";
import { kakaoIcon } from "@shared/icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const KAKAO_REDIRECT_LOCAL = import.meta.env
        .VITE_KAKAO_LOGIN_REDIRECT_URI_LOCAL;

      const KAKAO_REDIRECT_PRODUCTION = import.meta.env
        .VITE_KAKAO_LOGIN_REDIRECT_URI_PRODUCTION;

      const REDIRECT_URI = import.meta.env.PROD
        ? KAKAO_REDIRECT_PRODUCTION //프로덕션
        : KAKAO_REDIRECT_LOCAL; //로컬

      console.log(REDIRECT_URI);
      api
        .post(`api/kakao/login`, {
          code,
          redirectUri: REDIRECT_URI,
        })
        .then(() => {
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
