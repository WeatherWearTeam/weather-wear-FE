import api from "@api/api";

export type User = {
  userId: number;
  nickname: string;
  image: string;
};

export type Tag = {
  color: string;
  type: string;
};

export type Weather = {
  addressId: number;
  pcp: number | null;
  pop: number | null;
  pty: number | null;
  sky: number | null;
  tmp: number | null;
  wsd: number | null;
};

export type TrendItem = {
  id: number;
  user: User;
  createAt: string;
  updatedAt: string;
  address: string;
  addressId: number;
  title: string;
  contents: string;
  image: string;
  isPrivate: boolean;
  tags: Tag[];
  weather: Weather;
  boardLikesCount: number;
  views: number;
  commentCounts: number;
};

export interface TrendQueryParams {
  lastId?: number;
  address?: string;
  color?: string;
  type?: string;
  keyword?: string;
}

// 트렌드 게시물 전체 조회
export const getBoardsTrendItems = async () => {
  try {
    const response = await api.get("/api/boards");
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching trend items:", error);
    throw error;
  }
};
