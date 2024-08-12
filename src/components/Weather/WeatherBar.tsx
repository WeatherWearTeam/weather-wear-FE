import Icon from "@components/Icon";
import {
  weatherRainyIcon,
  weatherSnowIcon,
  weatherSunCloudyIcon,
  weatherSunIcon,
  weatherVeryCloudyIcon,
} from "@shared/icons";
import styled, { css } from "styled-components";

interface WeatherBarProps {
  onClick?: (sky: number | null, pty: number | null) => void;
  selectedWeather?: { sky: number | null; pty: number | null };
}

export default function WeatherBar({
  onClick,
  selectedWeather,
}: WeatherBarProps) {
  const weatherTypes = [
    {
      sky: null,
      pty: null,
      // label: "All",
      color: "GREEN",
      icon: <All>All</All>,
    },
    {
      sky: 1,
      pty: null,
      // label: "맑음",
      color: "YELLOW",
      icon: <Icon icon={weatherSunIcon} />,
    },
    {
      sky: 3,
      pty: null,
      // label: "구름많음",
      color: "GRAY",
      icon: <Icon icon={weatherSunCloudyIcon} />,
    },
    {
      sky: 4,
      pty: null,
      // label: "흐림",
      color: "BLACK",
      icon: <Icon icon={weatherVeryCloudyIcon} />,
    },
    {
      sky: null,
      pty: 1,
      // label: "비",
      color: "BLUE",
      icon: <Icon icon={weatherRainyIcon} />,
    },
    {
      sky: null,
      pty: 3,
      // label: "눈",
      color: "CYAN",
      icon: <Icon icon={weatherSnowIcon} />,
    },
  ];

  const handleClick = (sky: number | null, pty: number | null) => {
    if (onClick) onClick(sky, pty);
  };

  return (
    <Container>
      {weatherTypes.map(({ sky, pty, color, icon }) => (
        <ButtonWrapper
          key={`${sky}-${pty}`}
          $hovercolor={color}
          $isSelected={
            sky === selectedWeather?.sky && pty === selectedWeather?.pty
          }
          onClick={() => handleClick(sky, pty)}
        >
          {icon}
        </ButtonWrapper>
      ))}
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

const ButtonWrapper = styled.button<{
  $hovercolor: string; //후버 했을 때 색깔
  $isSelected?: boolean; // 선택 했을 때
}>`
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

  ${({ $isSelected, $hovercolor, theme }) =>
    $isSelected &&
    `
      background-color: ${theme.colors[$hovercolor]}66;
    `}
`;

const All = styled.div`
  width: 2rem;
  height: 2rem;
  font-size: medium;
`;
