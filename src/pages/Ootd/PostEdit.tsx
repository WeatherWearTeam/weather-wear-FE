import BoardForm from "@components/Board/BoardForm";
import { useParams } from "react-router-dom";
import { BoardByIdResponse } from "@api/boardApi";
import { useBoardById, useUpdateBoard } from "@queries/boardQueries";

export default function PostEdit() {
  const { id } = useParams<{ id: string }>();

  //현재 수정할 Board 조회
  const {
    board,
    isError,
    isPending,
    //  isSuccess
  } = useBoardById(Number(id));

  //수정하는 mutate 함수
  const {
    mutateUpdateBoard,
    isError: updateIsError,
    isPending: updateIsPending,
  } = useUpdateBoard();

  const onupdateBoard = (updatedBoard: FormData) => {
    mutateUpdateBoard(updatedBoard);
  };

  return (
    <>
      {isPending && <div>잠시만 기다려주세요!</div>}
      {isError && (
        <div>게시글 수정 중 오류가 발생했습니다.\n다시 시도해 주세요!</div>
      )}
      <BoardForm
        data={board as BoardByIdResponse}
        isError={updateIsError}
        isPending={updateIsPending}
        onUpdateBoard={onupdateBoard}
      />
    </>
  );
}
