export type ClothesKoreanType =
  | "민소매"
  | "반팔"
  | "얇은 셔츠"
  | "셔츠"
  | "긴팔"
  | "얇은 니트"
  | "블라우스"
  | "니트"
  | "후드"
  | "맨투맨"
  | "반바지"
  | "짧은 치마"
  | "원피스"
  | "슬랙스"
  | "면바지"
  | "청바지"
  | "스타킹"
  | "레깅스"
  | "가디건"
  | "자켓"
  | "트렌치코트"
  | "야상"
  | "가죽자켓"
  | "코트"
  | "패딩"
  | "히트텍"
  | "기모"
  | "목도리";

export type ClothesType =
  | "SLEEVELESS"
  | "SHORT_SLEEVE"
  | "LIGHT_SHIRT"
  | "SHIRT"
  | "LONG_SLEEVE"
  | "LIGHT_KNIT"
  | "BLOUSE"
  | "KNIT"
  | "HOODIE"
  | "SWEAT_SHIRT"
  | "SHORTS"
  | "MINI_SKIRT"
  | "DRESS"
  | "SLACKS"
  | "COTTON_PANTS"
  | "JEANS"
  | "STOCKINGS"
  | "LEGGINGS"
  | "CARDIGAN"
  | "JACKET"
  | "TRENCH_COAT"
  | "MILITARY_JACKET"
  | "LEATHER_JACKET"
  | "COAT"
  | "PADDED_COAT"
  | "HEAT_TECH"
  | "LINED_CLOTHING"
  | "SCARF";

const clothesTypeList: { key: ClothesType; value: ClothesKoreanType }[] = [
  { key: "SLEEVELESS", value: "민소매" },
  { key: "SHORT_SLEEVE", value: "반팔" },
  { key: "LIGHT_SHIRT", value: "얇은 셔츠" },
  { key: "SHIRT", value: "셔츠" },
  { key: "LONG_SLEEVE", value: "긴팔" },
  { key: "LIGHT_KNIT", value: "얇은 니트" },
  { key: "BLOUSE", value: "블라우스" },
  { key: "KNIT", value: "니트" },
  { key: "HOODIE", value: "후드" },
  { key: "SWEAT_SHIRT", value: "맨투맨" },
  //////////////////////////////////////////////////
  { key: "SHORTS", value: "반바지" },
  { key: "MINI_SKIRT", value: "짧은 치마" },
  { key: "DRESS", value: "원피스" },
  { key: "SLACKS", value: "슬랙스" },
  { key: "COTTON_PANTS", value: "면바지" },
  { key: "JEANS", value: "청바지" },
  //////////////////////////////////////////////////
  { key: "STOCKINGS", value: "스타킹" },
  { key: "LEGGINGS", value: "레깅스" },
  //////////////////////////////////////////////////
  { key: "CARDIGAN", value: "가디건" },
  { key: "JACKET", value: "자켓" },
  { key: "TRENCH_COAT", value: "트렌치코트" },
  { key: "MILITARY_JACKET", value: "야상" },
  { key: "LEATHER_JACKET", value: "가죽자켓" },
  { key: "COAT", value: "코트" },
  { key: "PADDED_COAT", value: "패딩" },
  //////////////////////////////////////////////////
  { key: "HEAT_TECH", value: "히트텍" },
  { key: "LINED_CLOTHING", value: "기모" },
  { key: "SCARF", value: "목도리" },
];

export default clothesTypeList;
