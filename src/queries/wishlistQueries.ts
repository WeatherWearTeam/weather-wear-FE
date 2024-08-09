import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWishlistItem,
  getRecommendsItems,
  getWishlistItems,
  deleteWishlistItem,
  WishlistItem,
  getWishlistItemById,
  Product,
  RequstsParams,
  deleteRecommendWishlistItem,
} from "@api/wishlistApi";
import { Axios, AxiosError } from "axios";


// 메인 페이전체 조회
export const useHomeRecommendsItems = (id: number) => {
  const {
    data: homeRecommendsData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["homeRecommendsItems", id],
    queryFn: () => getRecommendsItems(id),
  });
  return { homeRecommendsData, isPending, isError, isSuccess };
};

export const useDeleteRecommendWishlistItem = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutateDeleteRecommendWishlistItem,
    isPending: isPendingDelete,
    isError: isErrorDelete,
    isSuccess: isSuccessDelete,
  } = useMutation({
    mutationFn: deleteRecommendWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeRecommendsItems"] });
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });
  return {
    mutateDeleteRecommendWishlistItem,
    isPendingDelete,
    isErrorDelete,
    isSuccessDelete,
  };
};
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


// 위시 전제 조회
export const useWishlistItems = ({ page, type }: RequstsParams) => {
  const {
    data: wishlistItems,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["wishlistItems"],
    queryFn: () => getWishlistItems({ page, type }),
  });

  return { wishlistItems, isPending, isError, isSuccess };
};

// 개별 조회
export const useWishlistItem = (id: number) => {
  const {
    data: wishlistItem,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["wishlistItem", id],
    queryFn: () => getWishlistItemById(id),
    enabled: !!id,
  });

  return { wishlistItem, isPending, isError, isSuccess };
};

// 생성 기능
export const useCreateWishlistItem = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutateCreateWishlistItem,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlistItems"] });
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });

  //<WishlistItem, Error, Product>
  return { mutateCreateWishlistItem, isPending, isError, isSuccess };
};

// 삭제 기능
export const useDeleteWishlistItem = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutateDeleteWishlistItem,
    isPending: isPendingDelete,
    isError: isErrorDelete,
    isSuccess: isSuccessDelete,
  } = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlistItems"] });
    },
    onError: (error: AxiosError) => {
      let errorMessage = "오류가 발생했습니다.\n다시 시도해주세요.";
      if (error.response) {
        errorMessage = `${error.response.data}`;
        console.log(errorMessage);
      }
    },
  });
  return {
    mutateDeleteWishlistItem,
    isPendingDelete,
    isErrorDelete,
    isSuccessDelete,
  };
};

////////////////////////////////////////////////////////
