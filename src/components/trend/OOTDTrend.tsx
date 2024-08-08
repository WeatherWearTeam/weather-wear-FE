import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type ButtonType = "primary" | "secondary";

interface ButtonProps {
  $buttonType?: ButtonType;
  $selected?: boolean;
}

const OOTDTrend: React.FC = () => {
  const navigate = useNavigate();
  return (
    <HomeContents4>
      <TrendGrid>
        <TrendImage1 />
        <TrendText>
          <HomeTitle>OOTD Trend 추천</HomeTitle>
          <HomeContent>
            오늘 다른 사람들은 어떻게 입었을 까요?
            <br />
            오늘의 인기있는 OOTD 트랜드를 확인해보세요!
          </HomeContent>
          <TrendMore onClick={() => navigate("/ootd")}>MORE</TrendMore>
        </TrendText>
        <TrendImage2 />
        <TrendImage3 />
        <TrendImage4 />
      </TrendGrid>
    </HomeContents4>
  );
};

export default OOTDTrend;

const HomeTitle = styled.div`
  font-size: x-large;
  color: black;
  font-weight: bold;
`;

const HomeContent = styled.div`
  font-size: medium;
`;

const HomeContents4 = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrendGrid = styled.div`
  width: 100%;
  justify-content: center;
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(5, 200px);
  grid-gap: 20px;
  grid-template-rows: 200px 250px;
  grid-template-areas:
    "a a b b b"
    "a a c d e";

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 200px);
    grid-template-areas:
      "a a b b"
      "a a c d";
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: 250px 200px;
    grid-template-areas:
      "a a b "
      "a a c ";
  }

  @media (max-width: 768px) {
    grid-template-columns: 300px;
    grid-template-rows: 200px 250px 250px 250px;
    grid-template-areas:
      "b"
      "a"
      "c"
      "d";
  }
`;

const TrendImage = styled.div`
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;

const TrendImage1 = styled(TrendImage)`
  grid-area: a;
`;

const TrendText = styled.div`
  grid-area: b;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 12px;
`;

const TrendMore = styled.button<ButtonProps>`
  background-color: ${({ theme, $buttonType = "primary" }) =>
    theme.buttons[$buttonType].backgroundColor};
  border: ${({ theme, $buttonType = "primary" }) =>
    theme.buttons[$buttonType].border || "inherit"};
  color: ${({ theme, $buttonType = "primary" }) =>
    theme.buttons[$buttonType].color || "inherit"};
  width: 100px;
  height: 38px;
  cursor: pointer;
  border-radius: 30px;
  transition: background-color 0.2s, border-color 0.2s;
  outline: none;

  &:hover {
    background-color: ${({ theme, $buttonType = "primary" }) =>
      $buttonType === "secondary" ? theme.colors.BLACK : theme.colors.WHITE};
    border: 1px solid ${({ theme }) => theme.colors.BLACK};
    color: ${({ theme }) => theme.colors.BLACK};
  }

  &:focus {
    background-color: ${({ theme, $buttonType = "primary" }) =>
      $buttonType === "secondary" ? theme.colors.BLACK : theme.colors.WHITE};
    border: 1px solid ${({ theme }) => theme.colors.BLACK};
    color: ${({ theme }) => theme.colors.BLACK};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const TrendImage2 = styled(TrendImage)`
  grid-area: c;
`;
const TrendImage3 = styled(TrendImage)`
  grid-area: d;
`;
const TrendImage4 = styled(TrendImage)`
  grid-area: e;
`;
