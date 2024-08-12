import ClosetForm from "@components/Closet/ClosetForm";
import { useCreateClothesItem } from "@queries/clothesQueries";

export default function ClosetAdd() {
  const { mutateCreateClothesItem, isPending, isError } =
    useCreateClothesItem();

  const onCreateClothes = (newFormData: FormData) => {
    mutateCreateClothesItem(newFormData);
  };

  return (
    <ClosetForm
      isPending={isPending}
      isError={isError}
      onCreateClothes={onCreateClothes}
    />
  );
}
