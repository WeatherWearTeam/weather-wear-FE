import { ClothesColorType, colorTypeKoreanList } from "@shared/colorTypeList";

const getKoreanColor = (key: ClothesColorType): string => {
  const found = colorTypeKoreanList.find((item) => item.key === key);
  return found ? found.value : "옷 종류";
};
export default getKoreanColor;
