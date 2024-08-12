import clothesTypeList, {
  ClothesKoreanType,
  ClothesType,
} from "@shared/clothesTypeList";

const getKoreanType = (key: ClothesType): ClothesKoreanType | "옷 종류" => {
  const found = clothesTypeList.find((item) => item.key === key);
  return found ? found.value : "옷 종류";
};
export default getKoreanType;
