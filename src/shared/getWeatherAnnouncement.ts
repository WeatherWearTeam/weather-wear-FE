import { WeatherData } from "@api/weatherApi";

function calculateHeatIndex(temperature: number, humidity: number): number {
  // 불쾌지수 컨버트
  const tempF = (temperature * 9) / 5 + 32;
  // 불쾌지수 계산
  return (
    -42.379 +
    2.04901523 * tempF +
    10.14333127 * humidity -
    0.22475541 * tempF * humidity -
    6.83783e-3 * tempF * tempF -
    5.481717e-2 * humidity * humidity +
    1.22874e-3 * tempF * tempF * humidity +
    8.5282e-4 * tempF * humidity * humidity -
    1.99e-6 * tempF * tempF * humidity * humidity
  );
}

export default function getWeatherRecommendation(weather: WeatherData): string {
  const temperature = weather?.tmp;
  const sky = weather?.sky;
  const precipitation = weather?.pty;
  const windSpeed = weather?.wsd;
  const humidity = weather?.reh;

  if (temperature === null || humidity === null) {
    return "날씨에 대한 정보가 부족합니다. 날씨를 확인한 후 적절한 복장을 준비하세요.";
  }

  const heatIndex = calculateHeatIndex(temperature, humidity);

  // 온도 기준
  const isHot = temperature >= 24;
  const isVeryHot = temperature >= 30;
  // const isCool = temperature <= 10;

  // 바람 기준
  const isWindy = windSpeed && windSpeed >= 14;

  if (precipitation === 1) {
    // 비
    if (isVeryHot) {
      return heatIndex > 80
        ? `비가 내리고 있습니다.\n매우 덥고 불쾌지수가 높으니 통풍이 잘 되는 방수 재킷과 우산을 챙기세요.\n시원한 옷차림과 충분한 수분 섭취를 잊지 마세요.`
        : `비가 내리고 있습니다.\n매우 덥기 때문에 통풍이 잘 되는 방수 재킷과 우산을 챙기세요.\n시원한 옷차림과 충분한 수분 섭취를 잊지 마세요.`;
    } else if (isHot) {
      return heatIndex > 80
        ? `비가 내리고 있습니다.\n기온이 적당하지만 불쾌지수가 높으니 방수 기능이 있는 우산과 얇은 겉옷을 챙기세요.\n외출 시 안전하게 다녀오세요.`
        : `비가 내리고 있습니다.\n기온이 적당하므로 방수 기능이 있는 우산과 얇은 겉옷을 챙기세요.\n외출 시 안전하게 다녀오세요.`;
    } else {
      return `비가 내리고 있습니다.\n기온이 낮으니 방수 재킷과 따뜻한 옷을 착용하세요.\n바닥이 미끄러울 수 있으니 조심하시기 바랍니다.`;
    }
  }
  if (precipitation === 2) {
    // 비/눈 혼합
    if (temperature <= 0) {
      return heatIndex > 80
        ? `매우 추운 날씨와 비/눈 혼합이 예상됩니다.\n방한 재킷과 방수 기능이 있는 옷을 착용하세요.\n불쾌지수가 높으니 외출 시 조심하시기 바랍니다.`
        : `매우 추운 날씨와 비/눈 혼합이 예상됩니다.\n방한 재킷과 방수 기능이 있는 옷을 착용하세요.\n외출 시 조심하시기 바랍니다.`;
    } else {
      return `비와 눈이 혼합되어 내리고 있습니다.\n기온이 낮으므로 방한 재킷과 방수 기능이 있는 옷을 착용하세요.\n외출 시 조심하시기 바랍니다.`;
    }
  }

  if (precipitation === 3) {
    // 눈
    if (temperature <= 0) {
      return `매우 추운 날씨로 눈이 내리고 있습니다.\n방한 재킷과 장갑, 모자를 착용하고, 방수 기능이 있는 신발을 신으세요.\n외출 시 감기 조심하세요.`;
    } else if (temperature <= 10) {
      return `다소 추운 날씨로 눈이 내리고 있습니다.\n따뜻한 옷과 방한 용품을 착용하세요.\n외출 시 미끄러움에 주의하시기 바랍니다.`;
    } else {
      return `눈이 내리고 있습니다.\n기온이 다소 낮으니 따뜻한 옷과 방한 용품을 챙기세요.\n외출 시 주의가 필요합니다.`;
    }
  }
  if (precipitation === 4) {
    // 소나기
    if (isVeryHot) {
      return heatIndex > 80
        ? `매우 덥고 소나기가 내리고 있습니다.\n불쾌지수가 높으니 방수 기능이 있는 옷과 우산을 준비하시되, 외출은 최대한 자제하고 안전을 우선시하세요.`
        : `매우 덥고 소나기가 내리고 있습니다.\n방수 기능이 있는 옷과 우산을 준비하시되, 외출 시 주의가 필요합니다.`;
    } else if (isHot) {
      return heatIndex > 80
        ? `소나기가 내리고 있습니다.\n기온이 적당하지만 불쾌지수가 높으니 방수 재킷과 우산을 준비하세요.\n외출 시 주의가 필요합니다.`
        : `소나기가 내리고 있습니다.\n기온이 적당하므로 방수 재킷과 우산을 준비하세요.\n외출 시 주의가 필요합니다.`;
    } else {
      return `소나기가 내리고 기온이 낮습니다.\n방한 재킷과 방수 기능이 있는 옷을 착용하세요.\n외출 시 조심하시기 바랍니다.`;
    }
  }

  if (isWindy) {
    // 강한 바람
    if (isVeryHot) {
      return heatIndex > 80
        ? `더운 날씨와 함께 강한 바람이 불고 있습니다.\n불쾌지수가 높으니 얇은 겉옷이나 바람막이를 챙기고 외출 시 주의하세요.`
        : `더운 날씨와 함께 강한 바람이 불고 있습니다.\n얇은 겉옷이나 바람막이를 챙기고 외출 시 주의하세요.`;
    } else if (isHot) {
      return heatIndex > 80
        ? `강한 바람이 불고 있습니다.\n기온이 적당하지만 불쾌지수가 높으니 얇은 겉옷이나 바람막이를 챙기세요.\n외출 시 주의하세요.`
        : `강한 바람이 불고 있습니다.\n기온이 적당하지만 얇은 겉옷이나 바람막이를 챙기세요.\n외출 시 주의하세요.`;
    } else {
      return `강한 바람이 불고 기온이 낮습니다.\n방한 옷과 바람막이 재킷을 착용하세요.\n외출 시 안전에 유의하시기 바랍니다.`;
    }
  }

  if (sky === 1) {
    // 맑음
    if (isVeryHot) {
      return heatIndex > 80
        ? `오늘은 매우 덥습니다.\n불쾌지수가 높으니 가벼운 옷을 입고 충분한 수분을 섭취하세요.\n자외선 차단제를 바르고 그늘에서 휴식을 취하는 것이 좋습니다.`
        : `오늘은 매우 덥습니다.\n가벼운 옷을 입고 충분한 수분을 섭취하세요.\n자외선 차단제를 바르고 그늘에서 휴식을 취하는 것이 좋습니다.`;
    } else if (isHot) {
      return heatIndex > 80
        ? `맑고 화창한 날씨로 기온이 적당하지만 불쾌지수가 높습니다.\n가벼운 옷차림과 자외선 차단제를 챙기세요.\n외출 시 즐거운 하루 되세요!`
        : `맑고 화창한 날씨로 기온이 적당합니다.\n가벼운 옷차림과 자외선 차단제를 챙기세요.\n외출 시 즐거운 하루 되세요!`;
    } else {
      return `맑고 화창한 날씨이지만 기온이 낮습니다.\n외출 시 따뜻하게 입으세요.`;
    }
  }

  if (sky === 2) {
    // 구름 조금
    if (isVeryHot) {
      return heatIndex > 80
        ? `구름이 조금 낀 날씨입니다.\n매우 덥고 불쾌지수가 높으니 가벼운 옷을 입고 충분한 수분을 섭취하세요.\n자외선 차단제를 바르고 그늘에서 휴식을 취하는 것이 좋습니다.`
        : `구름이 조금 낀 날씨입니다.\n매우 덥기 때문에 가벼운 옷을 입고 충분한 수분을 섭취하세요.\n자외선 차단제를 바르고 그늘에서 휴식을 취하는 것이 좋습니다.`;
    } else if (isHot) {
      return heatIndex > 80
        ? `구름이 조금 낀 날씨입니다.\n기온이 적당하지만 불쾌지수가 높으니 가벼운 옷차림과 자외선 차단제를 챙기세요.\n외출 시 즐거운 하루 되세요!`
        : `구름이 조금 낀 날씨입니다.\n기온이 적당하므로 가벼운 옷차림과 자외선 차단제를 챙기세요.\n외출 시 즐거운 하루 되세요!`;
    } else {
      return `구름이 조금 낀 날씨이지만 기온이 낮습니다.\n외출 시 따뜻하게 입으세요.`;
    }
  }

  if (sky === 3) {
    // 구름 많음
    if (isVeryHot) {
      return heatIndex > 80
        ? `구름이 많지만 매우 덥습니다.\n불쾌지수가 높으니 가벼운 옷을 입고 충분한 수분을 섭취하세요.\n자외선 차단제를 바르고 그늘에서 휴식을 취하는 것이 좋습니다.`
        : `구름이 많지만 매우 덥습니다.\n가벼운 옷을 입고 충분한 수분을 섭취하세요.\n자외선 차단제를 바르고 그늘에서 휴식을 취하는 것이 좋습니다.`;
    } else if (isHot) {
      return heatIndex > 80
        ? `구름이 많은 날씨입니다.\n기온이 적당하지만 불쾌지수가 높으니 가벼운 옷차림과 자외선 차단제를 챙기세요.\n외출 시 즐거운 하루 되세요!`
        : `구름이 많은 날씨입니다.\n기온이 적당하므로 가벼운 옷차림과 자외선 차단제를 챙기세요.\n외출 시 즐거운 하루 되세요!`;
    } else {
      return `구름이 많은 날씨이지만 기온이 낮습니다.\n외출 시 따뜻하게 입으세요.`;
    }
  }

  if (sky === 4) {
    // 흐림
    if (isVeryHot) {
      return heatIndex > 80
        ? `흐린 날씨입니다.\n매우 덥고 불쾌지수가 높으니 가벼운 옷을 입고 충분한 수분을 섭취하세요.\n자외선 차단제를 바르고 그늘에서 휴식을 취하는 것이 좋습니다.`
        : `흐린 날씨입니다.\n매우 덥기 때문에 가벼운 옷을 입고 충분한 수분을 섭취하세요.\n자외선 차단제를 바르고 그늘에서 휴식을 취하는 것이 좋습니다.`;
    } else if (isHot) {
      return heatIndex > 80
        ? `흐린 날씨입니다.\n기온이 적당하지만 불쾌지수가 높으니 가벼운 옷차림과 자외선 차단제를 챙기세요.\n외출 시 즐거운 하루 되세요!`
        : `흐린 날씨입니다.\n기온이 적당하므로 가벼운 옷차림과 자외선 차단제를 챙기세요.\n외출 시 즐거운 하루 되세요!`;
    } else {
      return `흐린 날씨이지만 기온이 낮습니다.\n외출 시 따뜻하게 입으세요.`;
    }
  }

  return "날씨에 대한 정보가 부족합니다.\n날씨를 확인한 후 적절한 복장을 준비하세요.";
}
// 간단한 버전

// import { WeatherData } from "@api/weatherApi";

// export default function getWeatherRecommendation(weather: WeatherData): string {
//   const temperature = weather.tmp;
//   const sky = weather.sky;
//   const precipitation = weather.pty;
//   const windSpeed = weather.wsd;

//   if (precipitation === 1 || precipitation === 4) {
//     return temperature && temperature > 30
//       ? "비가 내리고 있습니다.\n매우 덥기 때문에 통풍이 잘 되는 방수 재킷과 우산을 챙기세요.\n시원한 옷차림과 충분한 수분 섭취를 잊지 마세요."
//       : temperature && temperature > 20
//       ? "비가 내리고 있습니다.\n기온이 적당하므로 방수 기능이 있는 우산과 편안한 옷을 입으세요.\n외출 시 안전하게 다녀오세요."
//       : "비가 내리고 있습니다.\n기온이 낮으니 방수 재킷과 따뜻한 옷을 착용하세요.\n바닥이 미끄러울 수 있으니 조심하시기 바랍니다.";
//   }

//   if (precipitation === 3) {
//     return temperature && temperature <= 0
//       ? "매우 추운 날씨로 눈이 내리고 있습니다.\n방한 재킷과 장갑, 모자를 착용하고, 방수 기능이 있는 신발을 신으세요. 외출 시 감기 조심하세요."
//       : temperature && temperature <= 10
//       ? "다소 추운 날씨로 눈이 내리고 있습니다. 따뜻한 옷과 방한 용품을 착용하세요. 외출 시 미끄러움에 주의하시기 바랍니다."
//       : "눈이 내리고 있습니다. 기온이 다소 낮으니 따뜻한 옷과 방한 용품을 챙기세요. 외출 시 주의가 필요합니다.";
//   }

//   if (precipitation === 2 || precipitation === 4) {
//     return temperature && temperature > 30
//       ? "매우 덥지만 천둥과 번개를 동반한 폭풍이 예상됩니다. 방수 기능이 있는 옷과 우산을 준비하시되 외출은 최대한 자제하고 안전을 우선시하세요."
//       : temperature && temperature > 20
//       ? "천둥과 번개를 동반한 폭풍이 예상됩니다. 적당한 기온이지만 방수 재킷과 우산을 준비하세요. 외출 시 주의가 필요합니다."
//       : "천둥과 번개를 동반한 폭풍이 예상됩니다. 기온이 낮아 방한 재킷과 방수 기능이 있는 옷을 착용하세요. 외출 시 조심하시기 바랍니다.";
//   }

//   if (windSpeed && windSpeed >= 14) {
//     return temperature && temperature > 30
//       ? "더운 날씨와 함께 강한 바람이 불고 있습니다. 바람막이 재킷을 챙기고 외출 시 주의하세요."
//       : temperature && temperature > 20
//       ? "강한 바람이 불고 있습니다. 기온이 적당하지만 바람막이 재킷을 입으세요. 외출 시 조심하세요."
//       : "강한 바람이 불고 기온이 낮습니다. 방한 옷과 바람막이 재킷을 착용하세요. 외출 시 안전에 유의하시기 바랍니다.";
//   }

//   if (sky === 1) {
//     return temperature && temperature > 30
//       ? "오늘은 매우 덥습니다. 가벼운 옷을 입고 충분한 수분을 섭취하세요. 자외선 차단제를 바르고 그늘에서 휴식을 취하는 것이 좋습니다."
//       : temperature && temperature > 20
//       ? "맑고 화창한 날씨로 기온이 적당합니다. 가벼운 옷차림과 자외선 차단제를 챙기세요. 외출 시 즐거운 하루 되세요!"
//       : "맑고 화창한 날씨이지만 기온이 낮아져서 쌀쌀 합니다. 외출 시 따뜻하게 입으세요.";
//   }

//   if (sky === 2) {
//     return temperature && temperature > 30
//       ? "구름이 조금 꼈지만 더운 날씨가 계속됩니다. 가벼운 옷과 충분한 수분을 챙기세요. 자외선 차단제를 바르고 외출 시 주의하세요."
//       : temperature && temperature > 20
//       ? "구름이 조금 낀 날씨이지만 기온은 적당합니다. 가벼운 외출 복장으로 충분합니다. 외출 시 참고하세요."
//       : "구름이 조금 낀 날씨로 기온이 낮습니다. 외출 시 따뜻하게 입으시기 바랍니다.";
//   }

//   if (sky === 3) {
//     return temperature && temperature > 30
//       ? "구름이 많지만 더운 날씨가 계속됩니다. 가벼운 옷과 충분한 수분을 챙기세요. 자외선 차단제를 바르고 외출 시 주의하세요."
//       : temperature && temperature > 20
//       ? "구름이 많지만 기온은 적당합니다. 중간 두께의 옷을 입으시면 좋습니다. 외출 시 참고하세요."
//       : "구름이 많고 기온이 낮습니다. 중간 두께의 옷을 입으세요. 외출 시 따뜻하게 입으세요.";
//   }

//   if (sky === 4) {
//     return temperature && temperature > 30
//       ? "흐리지만 더운 날씨가 계속됩니다. 가벼운 옷과 충분한 수분 섭취가 필요합니다. 자외선 차단제를 바르고, 가능한 한 실내에서 시간을 보내세요."
//       : temperature && temperature > 20
//       ? "흐리지만 기온이 적당합니다. 중간 두께의 옷을 입으시면 좋습니다. 외출 시 참고하세요."
//       : "날씨가 흐리고 기온이 낮습니다. 따뜻한 옷을 준비하세요. 외출 시 감기 조심하세요!";
//   }

//   return "날씨에 대한 정보가 부족합니다. 날씨를 확인한 후 적절한 복장을 준비하세요.";
// }
