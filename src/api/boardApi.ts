import { ClothesTag } from "@components/ClothesTag";
import { UserBoardByIdResponse } from "./boardApi";
import api from "@api/api";
import { ClothesType } from "@shared/clothesTypeList";
import { ClothesColorType } from "@shared/colorTypeList";

export interface WeatherResponse {
  id: number | null;
  pcp: number | null;
  pop: number | null;
  pty: number | null;
  reh: number | null;
  sky: number | null;
  sno: number | null;
  tmn: number | null;
  tmp: number | null;
  tmx: number | null;
  uuu: number | null;
  vec: number | null;
  vvv: number | null;
  wav: number | null;
  wsd: number | null;
}

export interface ClothesTagType {
  color: ClothesColorType;
  type: ClothesType;
}

export interface BoardResponse {
  id: number;
  address: string;
  // commentCount: number;
  image: string;
  likeCount: number;
  tags: ClothesTag[];
  title: string;
  views: number;
  weather: WeatherResponse;
}

// Trend 리소스 조회 => 🌟 trend 페이지
// ✅ 무한스크롤

export type TrendSearchKeysRequest = {
  color: string | null; //초기값
  type: string | null; //초기값
  keyword: string | null; //초기값
};
export const getTrendBoards = async () => {
  try {
    const response = await api.get(`/api/boards`, {
      withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

///////////////////////////////////////////////////////////////////////////
export interface TagBoardByIdResponse {
  color: ClothesColorType;
  type: ClothesType;
}
export interface UserBoardByIdResponse {
  id: number;
  email: string;
  image: string;
  nickname: string;
}
export interface WeatherBoardByIdResponse {
  addressId: number;
  pcp: number;
  pop: number;
  pty: number;
  sky: number;
  tmp: number;
  wsd: number;
}

export interface BoardByIdResponse {
  id: number;
  image: string;
  address: string;
  weather: WeatherBoardByIdResponse;
  user: UserBoardByIdResponse;
  title: string;
  contents: string;
  tags: TagBoardByIdResponse[];
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
  boardLikesCount: number;
  views: number;
  checkLike: boolean;
}
// 상세페이지 Board 리소스 조회 => 🌟 OOTD 상세 페이지
export const getBoardById = async (boardId: number) => {
  try {
    const response = await api.get(`/api/boards/${boardId}`, {
      withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//////////////////////////////////////////////////////////////////
// 전체 Boards 리소스 조회 => 🌟 trend 페이지
// ✅ 페이지네이션
export type UserBoardsSearchKeysRequest = {
  page: number;
  pty: number | null; //초기값
  sky: number | null; //초기값
  keyword: string | null; //초기값
};

export const getUserBoards = async (
  searchKeys: UserBoardsSearchKeysRequest
) => {
  try {
    const response = await api.get(`/api/users/boards`, {
      params: {
        page: searchKeys.page - 1,
        pty: searchKeys.pty,
        sky: searchKeys.sky,
        keyword: searchKeys.keyword,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
//////////////////////////////////////////////////////////////////

// Board 리소스 생성
export const createBoard = async (newBoardFormData: FormData) => {
  const response = await api.post(`/api/boards`, newBoardFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// DELETE Board 지우기
export const deleteBoard = async (boardId: number) => {
  await api.delete(`/api/boards/${boardId}`);
};

// PUT Board 업데이트하기
export const updateBoard = async (updatedBoard: FormData) => {
  const response = await api.put(`/api/boards`, updatedBoard, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

////////////////////////////////////////////////////////////////////////////////////

// PUT ❤️ 좋아요 toggle 업데이트하기
// export const toggleHeartBoard = async (boardId: number) => {
//   const currentBoard = await getBoardById(boardId);
//   const updatedBoard = { ...currentBoard, isLike: !currentBoard.isLike };
//   const response = await api.put(`/api/boards/${boardId}`, updatedBoard);
//   return response.data;
// };
export const toggleHeartBoard = async (boardId: number) => {
  // const currentBoard = await getBoardById(boardId);
  // const updatedBoard = { ...currentBoard, isLike: !currentBoard.isLike };
  const response = await api.post(`/api/boards/likes/${boardId}`);
  return response.data;
};

////////////////////////////////////////////////////////////////////////////////////////////////
export interface UserCommentsByBoardIdResponse {
  id: number;
  nickname: string;
  image: string;
}

export interface CommentsByBoardIdResponse {
  id: number;
  boardId: number;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: UserCommentsByBoardIdResponse;
}

// 보드별 코멘트 리스트 조회 => 🌟 상세페이지의 코멘트 부분
export const getCommentsByBoardId = async (boardId: number) => {
  try {
    const response = await api.get(`/api/boards/${boardId}/comments`, {
      withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// RESTful 원칙 준수: 자원의 계층적 관계를 명확히 표현할 수 있습니다.
// 가독성: URL만으로 자원 간의 관계를 쉽게 이해할 수 있습니다.
// 조직적 코드 구조: 관련 기능을 논리적으로 그룹화하여 코드의 유지보수성을 향상시킵니다.
// 댓글 조회 API 요청은 상위 리소스 파일에 포함시키고, 댓글 생성, 삭제, 업데이트와 같은 독립적인 작업은 댓글 리소스 파일에 포함시키는 것이 좋습니다.
