import Icon from "@components/Icon";
import {
  weatherCloudyIcon,
  weatherRainyIcon,
  weatherSnowIcon,
  weatherSunCloudyIcon,
  weatherSunIcon,
  //   weatherThunderstormsIcon,
  weatherVeryCloudyIcon,
} from "@shared/icons";

interface WeatherStateIconProps {
  pty: number;
  sky: number;
}

const WeatherStateIcon: React.FC<WeatherStateIconProps> = ({ pty, sky }) => {
  // 날씨 상태 따라 보여지는 날씨 아이콘
  const WeatherStateIconCondition = (): string => {
    if (pty === 1) return "rainy"; // 비
    if (pty === 3) return "snowy"; // 눈
    if (pty === 2) return "snowy-rainy"; //비/눈 혼합
    if (pty === 4) return "rainy"; // 소나기
    //////////////////////////////
    if (sky === 1) return "sunny"; // 맑음
    if (sky === 2) return "sunny-cloudy"; // 구름 조금
    if (sky === 3) return "cloudy"; // 구름 많음
    if (sky === 4) return "very-cloudy"; // 흐림

    // 기본적으로 맑은 날씨 처리
    return "sunny";
  };

  // 날씨 조건에 맞는 아이콘 컴포넌트 선택
  let weatherIcon: React.ReactNode;

  switch (WeatherStateIconCondition()) {
    case "sunny":
      weatherIcon = weatherSunIcon;
      break;
    case "sunny-cloudy":
      weatherIcon = weatherSunCloudyIcon; // 구름 조금 + 맑음
      break;
    case "cloudy":
      weatherIcon = weatherCloudyIcon;
      break;
    case "very-cloudy":
      weatherIcon = weatherVeryCloudyIcon; // 흐림
      break;
    case "rainy":
      weatherIcon = weatherRainyIcon;
      break;
    case "snowy":
      weatherIcon = weatherSnowIcon;
      break;
    // case "thunder":
    //   weatherIcon = weatherThunderstormsIcon;
    //   break;
    // case "thunderstorm":
    //   weatherIcon = weatherThunderstormsIcon;
    //   break;

    default:
      weatherIcon = weatherSunIcon; // 기본값
  }

  return <Icon icon={weatherIcon} />;
};

export default WeatherStateIcon;
