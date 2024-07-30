import { getBoards, createBoard } from "@api/boardApi";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

//전체 보드 조회
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

//보드 생성
export const useCreateBoard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: mutateCreateBoard,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createBoard, //✅ @api/boardApi 에 작성해둔 api 함수
    onSuccess: (board) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] }); // 변이 성공 시 캐시 무효화로 전체 boards 데이터 갱신
      navigate(`/ootd/${board.id}`, { replace: true }); // 생성 성공시 상세페이지로 이동, 히스토리 스택 대체
    },
  });

  return { mutateCreateBoard, isPending, isError }; // 컴포넌트에서 사용해야할 값 리턴하기
};
