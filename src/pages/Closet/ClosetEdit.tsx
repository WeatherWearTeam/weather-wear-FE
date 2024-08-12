import ClosetForm from "@components/Closet/ClosetForm";
import {
  useClothesItemById,
  useUpdateClothesItem,
} from "@queries/clothesQueries";
import { useParams } from "react-router-dom";

export default function ClosetEdit() {
  const { id } = useParams<{ id: string }>();

  //현재 수정할 Board 조회
  const {
    clothesItem,
    isError,
    isPending,
    // , isSuccess
  } = useClothesItemById(Number(id));

  //수정하는 mutate 함수
  const {
    mutateUpdateClothesItem,
    isError: updateIsError,
    isPending: updateIsPending,
  } = useUpdateClothesItem();

  const onUpdateClothes = (updatedFormData: FormData) => {
    mutateUpdateClothesItem(updatedFormData);
  };

  return (
    <>
      {isPending && <div>잠시만 기다려주세요!</div>}
      {isError && (
        <div>게시글 수정 중 오류가 발생했습니다.\n다시 시도해 주세요!</div>
      )}
      <ClosetForm
        data={clothesItem}
        isError={updateIsError}
        isPending={updateIsPending}
        onUpdateClothes={onUpdateClothes}
      />
    </>
  );
}
