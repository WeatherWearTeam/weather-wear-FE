import Icon from "@components/Icon";
import {
  weatherCloudyIcon,
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
      label: "All",
      color: "GREEN",
      icon: <All>All</All>,
    },
    {
      sky: 1,
      pty: null,
      label: "맑음",
      color: "YELLOW",
      icon: <Icon icon={weatherSunIcon} />,
    },
    {
      sky: 2,
      pty: null,
      label: "구름조금",
      color: "GRAY",
      icon: <Icon icon={weatherSunCloudyIcon} />,
    },
    {
      sky: 3,
      pty: null,
      label: "구름많음",
      color: "main",
      icon: <Icon icon={weatherCloudyIcon} />,
    },
    {
      sky: 4,
      pty: null,
      label: "흐림",
      color: "BLACK",
      icon: <Icon icon={weatherVeryCloudyIcon} />,
    },
    {
      sky: null,
      pty: 0,
      label: "비",
      color: "BLUE",
      icon: <Icon icon={weatherRainyIcon} />,
      ptyValues: [1, 2, 4], // All pty values for rainy conditions
    },
    {
      sky: null,
      pty: 3,
      label: "눈",
      color: "CYAN",
      icon: <Icon icon={weatherSnowIcon} />,
    },
  ];

  const handleClick = (sky: number | null, pty: number | null) => {
    if (onClick) onClick(sky, pty);
  };

  return (
    <Container>
      {weatherTypes.map(({ sky, pty, label, color, icon, ptyValues }) => (
        <ButtonWrapper
          key={`${sky}-${pty}`}
          $hovercolor={color}
          $isSelected={
            sky === selectedWeather?.sky &&
            ptyValues?.includes(selectedWeather?.pty ?? -1)
          }
          onClick={() => {
            // Handle clicking the icon
            if (ptyValues) {
              // If ptyValues is defined, set pty to one of the ptyValues (e.g., 1)
              onClick?.(sky, ptyValues[0]); // Use the first value or a specific logic
            } else {
              onClick?.(sky, pty);
            }
          }}
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
