import Cloudy from "@components/WeatherBackground/Cloudy";
import Hot from "@components/WeatherBackground/Hot";
import Rainy from "@components/WeatherBackground/Rainy";
import Snowy from "@components/WeatherBackground/Snowy";
import Sunny from "@components/WeatherBackground/Sunny";
import Thunderstorm from "@components/WeatherBackground/Thunderstorm";
import Windy from "@components/WeatherBackground/Windy";

interface WeatherDisplayProps {
  pty: number;
  sky: number;
  tmp: number;
  wsd: number;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  pty,
  sky,
  tmp,
  wsd,
}) => {
  // 날씨 상태를 결정하는 함수
  const determineWeatherCondition = (): string => {
    // 바람이 강한 경우
    if (wsd >= 14) return "windy";

    // 강수 형태에 따른 날씨 상태 결정
    if (pty === 1) return "rainy"; // 비
    if (pty === 3) return "snowy"; // 눈
    if (pty === 2) {
      // 비/눈 혼합
      if (tmp <= 0) return "snowy"; // 온도가 낮으면 눈
      return "rainy"; // 그 외에는 비
    }
    if (pty === 4) return "rainy"; // 소나기

    // 하늘 상태에 따른 날씨 상태 결정
    if (sky === 1) {
      // 맑음
      if (tmp >= 30) return "hot"; // 더운 날씨
      return "sunny";
    }
    if (sky === 2) return "sunny-cloudy"; // 구름 조금
    if (sky === 3) {
      // 구름 많음
      if (tmp <= 0) return "snowy-cloudy"; // 추운 날씨에 구름 많음
      return "cloudy";
    }
    if (sky === 4) return "very-cloudy"; // 흐림

    // 기본적으로 구름 많은 날씨 처리
    return "cloudy";
  };

  // 날씨 조건에 맞는 배경 컴포넌트 선택
  let WeatherBackgroundComponent: React.ComponentType;

  switch (determineWeatherCondition()) {
    case "rainy":
      WeatherBackgroundComponent = Rainy;
      break;
    case "snowy":
      WeatherBackgroundComponent = Snowy;
      break;
    case "thunderstorm":
      WeatherBackgroundComponent = Thunderstorm;
      break;
    case "windy":
      WeatherBackgroundComponent = Windy;
      break;
    case "cloudy":
      WeatherBackgroundComponent = Cloudy;
      break;
    case "sunny":
      WeatherBackgroundComponent = Sunny;
      break;
    case "hot":
      WeatherBackgroundComponent = Hot;
      break;
    case "sunny-cloudy":
      WeatherBackgroundComponent = Sunny; // 구름 조금은 Sunny로 처리
      break;
    case "snowy-cloudy":
      WeatherBackgroundComponent = Snowy; // 눈과 구름 많음 혼합은 Snowy로 처리
      break;
    case "very-cloudy":
      WeatherBackgroundComponent = Cloudy; // 흐림은 Cloudy로 처리
      break;
    default:
      WeatherBackgroundComponent = Sunny; // 기본값 맑은 배경
  }

  return <WeatherBackgroundComponent />;
};

export default WeatherDisplay;
