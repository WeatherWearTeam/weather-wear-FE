import api from "@api/api";
import { ClothesType } from "@shared/clothesTypeList";

export type NaverProduct = {
  brand: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  hprice: number;
  image: string;
  link: string;
  lprice: number;
  maker: string;
  mallName: string;
  id: number;
  title: string;
  type?: string; ////
};

export type WishlistItem = {
  id: number;
  product: NaverProduct;
  type: ClothesType; //////
};

export type WishlistResponse = {
  status: number;
};

// 홈 페이지 하단 네이버 추천 아이템 API
///////////////////////////////////////////////////////////////////////////
//네이버 추천 아이템 가져오기
export const getRecommendsItems = async (weatherId: number) => {
  try {
    const response = await api.get(`/api/recommends?id=${weatherId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 홈페이지에 렌더링되는 추천 리스트에 있는 추천 아이템 삭제
export const deleteRecommendWishlistItem = async (naverProductId: number) => {
  await api.delete(`/api/recommends/wishlist/${naverProductId}`);
};

///////////////////////////////////////////////////////////////////////////

export interface WishSearchKeysRequest {
  page: number;
  type: string | null;
}

export const getWishlistItems = async (searchKeys: WishSearchKeysRequest) => {
  try {
    const response = await api.get("/api/wishlist", {
      params: {
        page: searchKeys.page - 1, //페이네이션 실제로 0부터 시작되기 때문
        type: searchKeys.type,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 개별 데이터 조회
export const getWishlistItemById = async (id: number) => {
  const response = await api.get(`/api/wishlist/${id}`);
  return response.data;
};

// 생성
export const createWishlistItem = async (item: NaverProduct) => {
  console.log("아이템생성", item);
  const response = await api.post("/api/wishlist", item);
  console.log("response생성", response);
  return response.data;
};

// 삭제
export const deleteWishlistItem = async (wishlistId: number) => {
  await api.delete(`/api/wishlist/${wishlistId}`);
};
