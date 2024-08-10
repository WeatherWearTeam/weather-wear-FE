import { Gender } from "@queries/userQueries";

export default function getRecommendOutfit(tmp: number, gender: Gender) {
  if (gender === "MALE") {
    if (tmp >= 27) {
      return "반팔, 반바지";
    } else if (tmp >= 23 && tmp < 27) {
      return "반팔, 얇은 셔츠, 반바지, 면바지";
    } else if (tmp >= 20 && tmp < 23) {
      return "얇은 가디건, 긴팔, 면바지, 청바지";
    } else if (tmp >= 17 && tmp < 20) {
      return "얇은 니트, 맨투맨, 가디건, 청바지";
    } else if (tmp >= 12 && tmp < 17) {
      return "자켓, 가디건, 야상, 청바지, 면바지";
    } else if (tmp >= 9 && tmp < 12) {
      return "자켓, 트렌치코트, 야상, 니트, 청바지";
    } else if (tmp >= 5 && tmp < 9) {
      return "코트, 가죽자켓, 히트텍, 니트, 청바지";
    } else if (tmp < 5) {
      return "패딩, 두꺼운 코트, 목도리";
    } else {
      return "기온을 확인할 수 없습니다.";
    }
  } else if (gender === "FEMALE") {
    if (tmp >= 27) {
      return "민소매, 반팔, 반바지, 원피스";
    } else if (tmp >= 23 && tmp < 27) {
      return "반팔, 얇은 셔츠, 반바지, 면바지";
    } else if (tmp >= 20 && tmp < 23) {
      return "얇은 가디건, 긴팔, 면바지, 청바지";
    } else if (tmp >= 17 && tmp < 20) {
      return "얇은 니트, 맨투맨, 가디건, 청바지";
    } else if (tmp >= 12 && tmp < 17) {
      return "자켓, 가디건, 야상, 스타킹, 청바지, 면바지";
    } else if (tmp >= 9 && tmp < 12) {
      return "자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹";
    } else if (tmp >= 5 && tmp < 9) {
      return "코트, 가죽자켓, 히트텍, 니트, 레깅스";
    } else if (tmp < 5) {
      return "패딩, 두꺼운 코트, 목도리, 기모제품";
    } else {
      return "기온을 확인할 수 없습니다.";
    }
  } else {
    return "성별을 확인할 수 없습니다.";
  }
}
