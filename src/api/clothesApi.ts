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
  const response = await api.get(`clothes`, {
    params: {
      page: searchKeys.page - 1, //페이네이션 실제로 0부터 시작되기 때문
      color: searchKeys.color,
      type: searchKeys.type,
    },
  });

  return response.data;
};

export interface ClothesItemByIdResponse {
  id: number;
  image: string;
  color: ClothesColorType;
  type: ClothesType;
}

// 개별 데이터 조회 //하나씩 수정할 때 필요
export const getClothesItemById = async (id: number) => {
  const response = await api.get(`clothes/${id}`);
  return response.data;
};

// 생성
export const createClothesItem = async (formData: FormData) => {
  const response = await api.post("clothes", formData, {
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
  const response = await api.put(`clothes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 삭제
export const deleteClothesItem = async (clothesId: number): Promise<void> => {
  await api.delete(`clothes/${clothesId}`);
};
