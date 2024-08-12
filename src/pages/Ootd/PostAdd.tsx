import { useCreateBoard } from "@queries/boardQueries";
import BoardForm from "@components/Board/BoardForm";

export default function PostAdd() {
  const { mutateCreateBoard, isPending, isError } = useCreateBoard();

  const onCreateBoard = (newBoard: FormData) => {
    mutateCreateBoard(newBoard);
  };

  return (
    <BoardForm
      isPending={isPending}
      isError={isError}
      onCreateBoard={onCreateBoard}
    />
  );
}
