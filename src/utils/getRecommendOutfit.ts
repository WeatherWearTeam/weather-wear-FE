import { Gender } from "@queries/userQueries";

export default function getRecommendOutfit(tmp: number, gender?: Gender) {
  const recommendations: string[] = [];

  if (gender === "MALE" || gender === "FEMALE") {
    if (tmp >= 27) {
      recommendations.push(
        ...(gender === "MALE"
          ? ["반팔", "반바지"]
          : ["민소매", "반팔", "반바지", "원피스"])
      );
    } else if (tmp >= 23 && tmp < 27) {
      recommendations.push("반팔", "얇은 셔츠", "반바지", "면바지");
    } else if (tmp >= 20 && tmp < 23) {
      recommendations.push("얇은 가디건", "긴팔", "면바지", "청바지");
    } else if (tmp >= 17 && tmp < 20) {
      recommendations.push("얇은 니트", "맨투맨", "가디건", "청바지");
    } else if (tmp >= 12 && tmp < 17) {
      if (gender === "MALE") {
        recommendations.push("자켓", "가디건", "야상", "청바지", "면바지");
      } else {
        recommendations.push(
          "자켓",
          "가디건",
          "야상",
          "스타킹",
          "청바지",
          "면바지"
        );
      }
    } else if (tmp >= 9 && tmp < 12) {
      if (gender === "MALE") {
        recommendations.push("자켓", "트렌치코트", "야상", "니트", "청바지");
      } else {
        recommendations.push(
          "자켓",
          "트렌치코트",
          "야상",
          "니트",
          "청바지",
          "스타킹"
        );
      }
    } else if (tmp >= 5 && tmp < 9) {
      if (gender === "MALE") {
        recommendations.push("코트", "가죽자켓", "히트텍", "니트", "청바지");
      } else {
        recommendations.push("코트", "가죽자켓", "히트텍", "니트", "레깅스");
      }
    } else if (tmp < 5) {
      recommendations.push("패딩", "두꺼운 코트", "목도리");
      if (gender === "FEMALE") {
        recommendations.push("기모제품");
      }
    }
  } else {
    // 로그인하지 않은 사용자에게 성별 없이 추천
    if (tmp >= 27) {
      recommendations.push("반팔", "반바지");
    } else if (tmp >= 23 && tmp < 27) {
      recommendations.push("반팔", "얇은 셔츠", "반바지", "면바지");
    } else if (tmp >= 20 && tmp < 23) {
      recommendations.push("얇은 가디건", "긴팔", "면바지", "청바지");
    } else if (tmp >= 17 && tmp < 20) {
      recommendations.push("얇은 니트", "맨투맨", "가디건", "청바지");
    } else if (tmp >= 12 && tmp < 17) {
      recommendations.push("자켓", "가디건", "야상", "청바지", "면바지");
    } else if (tmp >= 9 && tmp < 12) {
      recommendations.push("자켓", "트렌치코트", "야상", "니트", "청바지");
    } else if (tmp >= 5 && tmp < 9) {
      recommendations.push("코트", "가죽자켓", "히트텍", "니트", "청바지");
    } else if (tmp < 5) {
      recommendations.push("패딩", "두꺼운 코트", "목도리");
    }
  }

  if (recommendations.length === 0) {
    recommendations.push(
      gender ? "기온을 확인할 수 없습니다." : "성별을 확인할 수 없습니다."
    );
  }

  return recommendations;
}
