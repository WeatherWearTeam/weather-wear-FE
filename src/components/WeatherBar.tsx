import Icon from "@components/Icon";
import {
  weatherCloudyIcon,
  weatherRainyIcon,
  weatherSnowIcon,
  weatherSunCloudyIcon,
  weatherSunIcon,
  weatherThunderstormsIcon,
  weatherVeryCloudyIcon,
} from "@shared/icons";
import styled, { css } from "styled-components";

export default function WeatherBar() {
  return (
    <Container>
      <ButtonWrapper $hovercolor="GREEN">
        <All>All</All>
      </ButtonWrapper>
      <ButtonWrapper $hovercolor="YELLOW">
        <Icon icon={weatherSunIcon} />
      </ButtonWrapper>
      <ButtonWrapper $hovercolor="GRAY">
        <Icon icon={weatherSunCloudyIcon} />
      </ButtonWrapper>
      <ButtonWrapper $hovercolor="main">
        <Icon icon={weatherCloudyIcon} />
      </ButtonWrapper>
      <ButtonWrapper $hovercolor="BLACK">
        <Icon icon={weatherVeryCloudyIcon} />
      </ButtonWrapper>
      {/* <ButtonWrapper $hovercolor="PURPLE">
        <Icon icon={weatherThunderstormsIcon} />
      </ButtonWrapper> */}
      <ButtonWrapper $hovercolor="BLUE">
        <Icon icon={weatherRainyIcon} />
      </ButtonWrapper>
      <ButtonWrapper $hovercolor="CYAN">
        <Icon icon={weatherSnowIcon} />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 380px;
  border: ${({ theme }) => theme.borders.containerBorder};
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 1rem;
  border-radius: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.button<{ $hovercolor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  transition: background-color linear 0.25s;
  cursor: pointer;
  &:hover,
  &:focus {
    ${({ $hovercolor, theme }) => css`
      background-color: ${theme.colors[$hovercolor]}66; //투명도 40%
    `};
  }
`;

const All = styled.div`
  width: 2rem;
  height: 2rem;
  font-size: medium;
`;
