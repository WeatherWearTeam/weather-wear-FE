import api from "@api/api";
import { ClothesType } from "@shared/clothesTypeList";
import { ClothesColorType } from "@shared/colorTypeList";

export type ClothesItemType = {
  id: number;
  type: ClothesType;
  color: ClothesColorType;
  image: string;
};

export type ClothesItemsResponse = {
  content: ClothesItemType[]; //옷 아이템 든 배열
};

export type SearchKeysRequest = {
  page: number;
  color: ClothesColorType | null; //초기값 null
  type: ClothesType | null; //초기값 null
};

//전체 데이터 조회
export const getClothesItems = async (searchKeys: SearchKeysRequest) => {
  try {
    console.log("SearchKeysRequest", searchKeys);
    const response = await api.get(`/api/clothes`, {
      params: {
        page: searchKeys.page - 1,
        color: searchKeys.color,
        type: searchKeys.type,
      },
    });
    console.log("clothes 데이터", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 개별 데이터 조회 //하나씩 수정할 때 필요함
export const getClothesItemById = async (
  id: number
): Promise<ClothesItemsResponse> => {
  const response = await api.get(`/api/clothes/${id}`);
  return response.data;
};

// 생성
export const createClothesItem = async (
  formData: FormData
): Promise<ClothesItemsResponse> => {
  const response = await api.post("/api/clothes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 수정
export const updateClothesItem = async (
  formData: FormData
): Promise<ClothesItemsResponse> => {
  const response = await api.put(`/api/clothes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};

// 삭제
export const deleteClothesItem = async (clothesId: number): Promise<void> => {
  await api.delete(`/api/clothes/${clothesId}`);
};
