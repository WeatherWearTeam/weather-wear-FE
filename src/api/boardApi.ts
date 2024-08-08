import api from "@api/api";
import { Board } from "@queries/boardQueries";
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

export interface ClothesTag {
  color: ClothesColorType;
  type: ClothesType;
}

export interface BoardResponse {
  address: string;
  commentCount: number;
  id: number;
  image: string;
  likeCount: number;
  tags: ClothesTag[];
  title: string;
  views: number;
  weather: WeatherResponse;
}

// 전체 Boards 리소스 조회 => 🌟 trend 페이지
export const getBoards = async () => {
  const response = await api.get(`/api/boards`, {
    withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
  });
  return response.data;
};

// 특정 Board 리소스 조회 => 🌟 OOTD 상세 페이지
export const getBoardById = async (boardId: number) => {
  const response = await api.get(`/api/boards/${boardId}`, {
    withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
  });
  return response.data;
};

// Board 리소스 생성
// FormData를 사용하는 경우 타입도 폼 데이터
//newBoard: Omit<Board, "id">
export const createBoard = async (newBoardFormData: FormData) => {
  // const response =
  await api
    .post(`/api/boards`, newBoardFormData)
    .then((response) => response.data) // JSON이 아닌 경우
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
  // return response.data;
};

// DELETE Board 지우기
export const deleteBoard = async (boardId: number) => {
  await api.delete(`/api/boards/${boardId}`);
};

// PUT Board 업데이트하기
export const updateBoard = async (updatedBoard: Board) => {
  const response = await api.put(
    `/api/boards/${updatedBoard.id}`,
    updatedBoard
  );
  return response.data;
};

////////////////////////////////////////////////////////////////////////////////////

// PUT ❤️ 좋아요 toggle 업데이트하기
export const toggleHeartBoard = async (boardId: number) => {
  const currentBoard = await getBoardById(boardId);
  const updatedBoard = { ...currentBoard, isLike: !currentBoard.isLike };
  const response = await api.put(`/api/boards/${boardId}`, updatedBoard);
  return response.data;
};

////////////////////////////////////////////////////////////////////////////////////////////////

// 보드별 코멘트 리스트 조회 => 🌟 상세페이지의 코멘트 부분
export const getCommentsByBoardId = async (boardId: number) => {
  const response = await api.get(`/api/boards/${boardId}/comments`, {
    withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
  });
  return response.data;
};

// RESTful 원칙 준수: 자원의 계층적 관계를 명확히 표현할 수 있습니다.
// 가독성: URL만으로 자원 간의 관계를 쉽게 이해할 수 있습니다.
// 조직적 코드 구조: 관련 기능을 논리적으로 그룹화하여 코드의 유지보수성을 향상시킵니다.
// 댓글 조회 API 요청은 상위 리소스 파일에 포함시키고, 댓글 생성, 삭제, 업데이트와 같은 독립적인 작업은 댓글 리소스 파일에 포함시키는 것이 좋습니다.
