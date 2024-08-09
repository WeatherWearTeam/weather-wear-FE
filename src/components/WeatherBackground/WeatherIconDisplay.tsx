import SunCloudyIcon from "@assets/icons/sun_cloudy.svg?react";
import CloudyIcon from "@assets/icons/cloudy.svg?react";
import VeryCloudyIcon from "@assets/icons/very_cloudy.svg?react";
import RainySunCloudyIcon from "@assets/icons/rainy_sun_cloudy.svg?react";
import RainyIcon from "@assets/icons/rainy.svg?react";
import SnowyIcon from "@assets/icons/snowy.svg?react";
import SunnyIcon from "@assets/icons/sunny.svg?react";
import ThunderIcon from "@assets/icons/thunder.svg?react";
import ThunderstormIcon from "@assets/icons/thunderstorm.svg?react";
import WindyIcon from "@assets/icons/windy.svg?react";

interface WeatherIconDisplayProps {
  pty: number;
  sky: number;
  tmp: number;
  wsd: number;
}

const WeatherIconDisplay: React.FC<WeatherIconDisplayProps> = ({
  pty,
  sky,
  tmp,
  wsd,
}) => {
  // 날씨 상태를 결정하는 함수
  const determineWeatherCondition = (): string => {
    if (pty === 1) return "rainy"; // 비
    if (pty === 3) return "snowy"; // 눈
    if (pty === 2) {
      // 비/눈 혼합
      if (tmp !== null && tmp <= 0) return "snowy"; // 온도가 낮으면 눈
      return "rainy"; // 그 외에는 비
    }
    if (pty === 4) return "rainy"; // 소나기

    if (sky === 1) return "sunny"; // 맑음
    if (sky === 2) return "sunny-cloudy"; // 구름 조금
    if (sky === 3) return "cloudy"; // 구름 많음
    if (sky === 4) return "very-cloudy"; // 흐림

    if (wsd !== null && wsd >= 14) return "windy"; // 강한 바람

    // 온도가 높으면 'hot'으로 처리
    if (tmp !== null && tmp >= 30) return "hot";

    // 기본적으로 맑은 날씨 처리
    return "sunny";
  };

  // 날씨 조건에 맞는 아이콘 컴포넌트 선택
  let WeatherIconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;

  switch (determineWeatherCondition()) {
    case "rainy":
      WeatherIconComponent = RainyIcon;
      break;
    case "snowy":
      WeatherIconComponent = SnowyIcon;
      break;
    case "thunder":
      WeatherIconComponent = ThunderIcon;
      break;
    case "thunderstorm":
      WeatherIconComponent = ThunderstormIcon;
      break;
    case "windy":
      WeatherIconComponent = WindyIcon;
      break;
    case "cloudy":
      WeatherIconComponent = CloudyIcon;
      break;
    case "sunny":
      WeatherIconComponent = SunnyIcon;
      break;
    case "sunny-cloudy":
      WeatherIconComponent = SunCloudyIcon; // 구름 조금 + 맑음
      break;
    case "very-cloudy":
      WeatherIconComponent = VeryCloudyIcon; // 흐림
      break;
    case "rainy-sun-cloudy":
      WeatherIconComponent = RainySunCloudyIcon; // 비와 구름
      break;
    case "hot":
      WeatherIconComponent = SunnyIcon; // 'hot' 조건은 sunny 아이콘으로 처리
      break;
    default:
      WeatherIconComponent = SunnyIcon; // 기본값
  }

  return <WeatherIconComponent width="25rem" height="25rem" />;
};

export default WeatherIconDisplay;
