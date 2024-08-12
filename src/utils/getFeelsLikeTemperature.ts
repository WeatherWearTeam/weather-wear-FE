// 여름 체감온도 (Heat Index) 계산 함수
function calculateHeatIndex(temperature, humidity) {
  if (temperature === null || humidity === null) return null;

  const T = temperature; // 기온 (섭씨)
  const RH = humidity; // 습도 (%)

  // Heat Index 계산식을 섭씨로 변환
  const heatIndex =
    -8.78469475556 +
    1.61139411 * T +
    2.33854883889 * RH -
    0.14611605 * T * RH -
    0.012308094 * T * T -
    0.0164248277778 * RH * RH +
    0.002211732 * T * T * RH +
    0.00072546 * T * RH * RH -
    0.000003582 * T * T * RH * RH;
  return heatIndex;
}

// 겨울 체감온도 (Wind Chill) 계산 함수
function calculateWindChill(temperature, windSpeed) {
  if (temperature === null || windSpeed === null) return null;

  const T = temperature; // 기온 (섭씨)
  const V = windSpeed; // 풍속 (m/s)

  // Wind Chill 계산식 (섭씨)
  const windChill =
    13.12 +
    0.6215 * T -
    11.37 * Math.pow(V, 0.16) +
    0.3965 * T * Math.pow(V, 0.16);
  return windChill;
}

// 체감온도 계산
export default function getFeelsLikeTemperature(
  tmp: number,
  reh: number,
  wsd: number
): string {
  const temperature = tmp; // 기온
  const humidity = reh; // 습도
  const windSpeed = wsd; // 풍속

  if (temperature === null) {
    return "기온 데이터가 없습니다.";
  }

  // 체감온도 계산 기준을 설정
  const isHot = temperature > 20; // 여름 기준 온도
  const isCold = temperature < 10; // 겨울 기준 온도

  let feelsLikeTemperature: number | null = null;

  if (humidity !== null && isHot) {
    // 여름 체감온도
    feelsLikeTemperature = calculateHeatIndex(temperature, humidity);
    return `${feelsLikeTemperature?.toFixed(1)}°C`;
  }

  if (windSpeed !== null && isCold) {
    // 겨울 체감온도
    feelsLikeTemperature = calculateWindChill(temperature, windSpeed);
    return `${feelsLikeTemperature?.toFixed(1)}°C`;
  }

  // 일반적인 경우
  return `현재 기온과 동일`;
}
