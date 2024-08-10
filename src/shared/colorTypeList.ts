export type ClothesColorType =
  | "WHITE"
  | "GRAY"
  | "BLACK"
  | "RED"
  | "YELLOW"
  | "SAND"
  | "BEIGE"
  | "BROWN"
  | "KHAKI"
  | "GREEN"
  | "CYAN"
  | "BLUE"
  | "INDIGO"
  | "PURPLE"
  | "PINK";

const colorTypeList: ClothesColorType[] = [
  "WHITE",
  "GRAY",
  "BLACK",
  "RED",
  "YELLOW",
  "SAND",
  "BEIGE",
  "BROWN",
  "KHAKI",
  "GREEN",
  "CYAN",
  "BLUE",
  "INDIGO",
  "PURPLE",
  "PINK",
];

export default colorTypeList;




export const colorTypeKoreanList: { key: ClothesColorType; value: string }[] = [
  { key: "WHITE", value: "흰색" },
  { key: "GRAY", value: "회색" },
  { key: "BLACK", value: "검은색" },
  { key: "RED", value: "빨간색" },
  { key: "YELLOW", value: "노란색" },
  { key: "SAND", value: "모래색" },
  { key: "BEIGE", value: "베이지색" },
  { key: "BROWN", value: "갈색" },
  { key: "KHAKI", value: "카키색" },
  { key: "GREEN", value: "녹색" },
  { key: "CYAN", value: "청록색" },
  { key: "BLUE", value: "파란색" },
  { key: "INDIGO", value: "남색" },
  { key: "PURPLE", value: "보라색" },
  { key: "PINK", value: "분홍색" },
];