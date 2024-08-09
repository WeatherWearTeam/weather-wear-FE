import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createClothesItem,
  getClothesItems,
  deleteClothesItem,
  getClothesItemById,
  updateClothesItem,
  SearchKeysRequest,
} from "@api/clothesApi";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

// 전체 조회
export const useClothesItems = (searchKeys: SearchKeysRequest) => {
  const {
    data: clothesItems,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [
      "clothesItems",
      searchKeys.page, //쿼리 바뀔때 재요청 되어야 하니까
      searchKeys.color,
      searchKeys.type,
    ],
    queryFn: () => getClothesItems(searchKeys),
  });
  return { clothesItems, isPending, isError, isSuccess };
};

// 개별 데이터 조회
export const useClothesItemById = (id: number) => {
  const {
    data: clothesItem,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["clothesItem", id],
    queryFn: () => getClothesItemById(id),
  });
  return { clothesItem, isPending, isError, isSuccess };
};

// 생성 기능
export const useCreateClothesItem = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: mutateCreateClothesItem,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createClothesItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clothesItems"] });
      navigate(`/mypage/closet`, { replace: true }); //히스토리 스택 대체
      window.history.go(-1); // add 페이지 자체 히스토리에서 빼고 가기
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  return { mutateCreateClothesItem, isPending, isError, isSuccess };
};

// 수정 기능
export const useUpdateClothesItem = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: mutateUpdateClothesItem,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updateClothesItem,
    onSuccess: () => {
      // 데이터 수정 후, 전체 데이터 무효화
      queryClient.invalidateQueries({ queryKey: ["clothesItems"] });
      navigate(`/mypage/closet`, { replace: true }); //히스토리 스택 대체
      window.history.go(-1); // add 페이지 자체 히스토리에서 빼고 가기
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });
  return { mutateUpdateClothesItem, isPending, isError, isSuccess };
};

// 삭제 기능
export const useDeleteClothesItem = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutateDeleteClothesItem,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: deleteClothesItem,
    onSuccess: () => {
      // 데이터 삭제 후, 전체 데이터 무효화
      queryClient.invalidateQueries({ queryKey: ["clothesItems"] });
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해 주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });
  return { mutateDeleteClothesItem, isPending, isError, isSuccess };
};
