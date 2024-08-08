import { Comments } from "@components/Comment/Comments";
import {
  getBoards,
  createBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
  toggleHeartBoard,
} from "@api/boardApi";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

// interface Weather {
//   id: number;
//   stn: number;
//   //bcode:number;
//   address: string;
//   ta: number;
//   sky: number;
//   prep: Date | string;
// }

// interface BoardLikes {
//   boardId: number;
//   likeSub: number;
// }

// interface BoardTag {
//   id: number;
//   boardId: number;
//   color: string;
//   type: string;
// }

// interface BoardImage {
//   id: number;
//   image: string;
//   boardId: number;
//   createdAt: Date | string;
// }

// interface User {
//   userId: number;
//   nickname: string;
//   image: string;
// }

// export interface Board {
//   id: number;
//   user: User;
//   title: string;
//   contents: string;
//   isPrivate: boolean;
//   stn: number;
//   createdAt: Date | string;
//   updatedAt: Date | string;
//   weather: Weather;
//   comments: Comments;
//   boardLikes: BoardLikes;
//   boardTags: BoardTag[];
//   boardImage: BoardImage;
// }

///////////////////////////////////////////////////////////////

export const useBoards = () => {
  const {
    data: boards,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards, //✅ @api/boardApi 에 작성해둔 api 함수
  });

  return { boards, isPending, isError, isSuccess };
};

///////////////////////////////////////////////////////////////

export const useBoardById = (boardId: number) => {
  const {
    data: board,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoardById(boardId),
    enabled: !!boardId, // id가 있을 때만 쿼리를 실행
  });

  return { board, isPending, isError, isSuccess };
};

///////////////////////////////////////////////////////////////

//보드 생성
export const useCreateBoard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateCreateBoard,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createBoard,

    onSuccess: (resBoard, board) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] }); //전체 보드
      queryClient.invalidateQueries({ queryKey: ["board", resBoard.id] }); // 상세 페이지에서 겟하는 보드 아이디에 해당하는 보드
      navigate(`/boards/${resBoard.id}`, { replace: true }); //히스토리 스택 대체
      window.history.go(-1); // add 페이지 자체 히스토리에서 빼고 가기
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },

    // onSuccess: (_, board) => {
    //   queryClient.invalidateQueries({ queryKey: ["boards"] }); // 변이 성공 시 캐시 무효화로 전체 boards 데이터 갱신
    //   navigate(`/ootd/${board.id}`, { replace: true }); // 생성 성공시 상세페이지로 이동, 히스토리 스택 대체
    // },
  });

  return { mutateCreateBoard, isPending, isError }; // 컴포넌트에서 사용해야할 값 리턴하기
};

///////////////////////////////////////////////////////////////
export const useDeleteBoard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateDeleteBoard,
    isPending: isPendingDelete,
    isError: isErrorDelete,
  } = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      navigate(`/mypage/myootd`, { replace: true }); // 생성 성공시 상세페이지로 이동, 히스토리 스택 대체
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });
  return { mutateDeleteBoard, isPendingDelete, isErrorDelete };
};

///////////////////////////////////////////////////////////////
export const useUpdateBoard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateUpdateBoard,
    isPending,
    isError,
  } = useMutation({
    mutationFn: updateBoard,
    //첫 번째 인자: mutationFn이 반환하는 response.data
    //두 번째 인자: mutationFn의 인자로 보낸 업데이트된 보드 > 쓰면 안전빵..?
    onSuccess: (_, board) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] }); //전체 보드
      queryClient.invalidateQueries({ queryKey: ["board", board.id] }); // 상세 페이지에서 겟하는 보드 아이디에 해당하는 보드
      navigate(`/boards/${board.id}`, { replace: true }); //히스토리 스택 대체
      window.history.go(-1); // 수정 페이지 자체 히스토리에서 빼고 가기
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  return {
    mutateUpdateBoard,
    isPending,
    isError,
  };
};

///////////////////////////////////////////////////////////////

export const useToggleLikeBoard = () => {
  const queryClient = useQueryClient();

  const {
    mutate: mutateToggleLikeBoard,
    isPending,
    isError,
  } = useMutation({
    mutationFn: toggleHeartBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  return { mutateToggleLikeBoard, isPending, isError };
};
///////////////////////////////////////////////////////////////
