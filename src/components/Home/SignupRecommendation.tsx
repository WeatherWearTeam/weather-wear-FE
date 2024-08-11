import Button from "@components/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignupRecommendation() {
  const navigate = useNavigate();
  return (
    <Container>
      <Divider />
      <ContentContainer>
        <TextContainer>
          <ContentTitle>지금 웨더웨어를 시작해 보세요!</ContentTitle>
          <ContentDescription>
            웨더웨어는 날씨를 기반으로
            <br />
            개인 맞춤형 옷차림 추천 서비스를 제공하는 패션 커뮤니티입니다.
            <br />
            <br />
            사용자들과 함께 OOTD 패션 스타일을 공유하고,
            <br />
            오늘의 날씨에 딱 맞는 나만의 특별한 OOTD로 스타일리시하게 하루를
            시작해보세요!
          </ContentDescription>
        </TextContainer>
        <Button onClick={() => navigate("/login")}>시작하기</Button>
      </ContentContainer>
    </Container>
  );
}

const Divider = styled.hr`
  width: 15rem;
  /* margin: 20px 0; */
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;

  button {
    width: 15rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 2rem;
`;

const ContentTitle = styled.h2`
  font-size: xx-large;
  color: black;
  font-weight: bold;

  @media (max-width: 900px) {
    font-size: x-large;
  }
`;

const ContentDescription = styled.p`
  font-size: large;

  @media (max-width: 600px) {
    font-size: medium;
  }
`;

//✅ 페이지 아웃라인
const Container = styled.div`
  /* height: calc(100vh - 7rem); */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 4rem 4rem 4rem;
  gap: 1rem;

  @media (max-width: 900px) {
    padding-top: 4rem;
  }
`;
