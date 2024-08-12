import api from "@api/api";

export interface User {
  email: string;
  id: number;
  image: string;
  nickname: string;
}

export interface Weather {
  addressId: number;
  pcp: number | null;
  pop: number | null;
  pty: number | null;
  sky: number | null;
  tmp: number | null;
  wsd: number | null;
}

export interface TrendItemResponse {
  address: string;
  boardLikesCount: number;
  checkLike: boolean;
  commentsCount: number;
  contents: string;
  createdAt: string;
  id: number;
  image: string;
  isPrivate: boolean;
  tags: { color: string | null; type: string | null }[];
  title: string;
  updatedAt: string;
  user: User;
  views: number;
  weather: Weather;
}

export interface TrendQueryParams {
  lastId: number | null;
  color: string | null;
  type: string | null;
  keyword: string | null;
}

// 트렌드 게시물 전체 조회
export const getBoardsTrendItems = async (searchKeys: TrendQueryParams) => {
  try {
    const response = await api.get("/api/boards", {
      params: searchKeys,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trend items:", error);
    throw error;
  }
};
