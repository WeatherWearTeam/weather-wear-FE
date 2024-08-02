import { create } from "zustand";

export type ClothesType =
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

export type ClothesColorType =
  | "white"
  | "gray"
  | "black"
  | "red"
  | "yellow"
  | "sand"
  | "beige"
  | "brown"
  | "khaki"
  | "green"
  | "cyan"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

interface ClothesTag {
  id: number;
  type: ClothesType;
  color: ClothesColorType;
}

interface StoreState {
  selectedType: ClothesType | "옷 종류";
  selectedColor: ClothesColorType | "";
  newTagList: ClothesTag[];
}

interface StoreActions {
  setSelectedType: (type: ClothesType | "옷 종류") => void;
  setSelectedColor: (color: ClothesColorType | "") => void;

  addTag: (tag: ClothesTag) => void;
  removeTag: (id: number) => void;
  resetSelections: () => void;
}

// 초기 상태 정의
const useClothesTagStore = create<StoreState & StoreActions>((set) => ({
  selectedType: "옷 종류",
  selectedColor: "",
  newTagList: [],

  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedColor: (color) => set({ selectedColor: color }),

  addTag: (tag) =>
    set((state) => {
      // '옷 종류' 상태일 때는 태그 추가를 방지
      if (state.selectedType === "옷 종류" || state.selectedColor === "") {
        return state; // 상태를 변경하지 않음
      }

      return {
        newTagList: [...state.newTagList, tag],
        selectedType: "옷 종류", // 리셋
        selectedColor: "",
      };
    }),

  removeTag: (id) =>
    set((state) => ({
      newTagList: state.newTagList.filter((tag) => tag.id !== id),
    })),

  resetSelections: () => set({ selectedType: "옷 종류", selectedColor: "" }),
}));

export default useClothesTagStore;
