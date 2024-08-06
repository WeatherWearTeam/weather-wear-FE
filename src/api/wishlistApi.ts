import api from "@api/api";

export type WishlistItem = {
    id: string; // API에서 문자열로 받는 경우
    productId: number;
    title: string;
    link: string;
    image: string;
    lprice: number;
    hprice: number;
    mallName: string;
    brand: string;
    maker: string;
    category1: string;
    category2: string;
    category3: string;
    category4: string;
    type: string;
}

// 전체 데이터 조회
export const getWishlistItems = async (): Promise<WishlistItem[]> => {
    const response = await api.get('/wishlist');
    // console.log("리스폰스 데이터", response.data);
    return response.data;
};

// 개별 데이터 조회
export const getWishlistItemById = async (id: string): Promise<WishlistItem> => {
    const response = await api.get(`/wishlist/${id}`);
    return response.data;
};

// 생성
export const createWishlistItem = async (item: WishlistItem): Promise<WishlistItem> => {
    const response = await api.post('/wishlist', item);
    return response.data;
};

// 삭제
export const deleteWishlistItem = async (wishlistItemId: string): Promise<void> => {
    await api.delete(`/wishlist/${wishlistItemId}`);
};