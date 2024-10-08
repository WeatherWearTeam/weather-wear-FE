import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWishlistItem,
  getRecommendsItems,
  getWishlistItems,
  deleteWishlistItem,
  getWishlistItemById,
  deleteRecommendWishlistItem,
  WishSearchKeysRequest,
} from "@api/wishlistApi";
import { AxiosError } from "axios";

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// 메인 페이전체 조회
export const useHomeRecommendsItems = (weatherId: number) => {
  const {
    data: homeRecommendsData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["homeRecommendsItems", weatherId],
    queryFn: () => getRecommendsItems(weatherId),
    enabled: !!weatherId,
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
      return error;
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
export const useWishlistItems = (searchKeys: WishSearchKeysRequest) => {
  const {
    data: wishlistItems,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["wishlistItems", searchKeys.page, searchKeys.type],
    queryFn: () => getWishlistItems(searchKeys),
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
      return error;
    },
  });

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
      return error;
    },
  });
  return {
    mutateDeleteWishlistItem,
    isPendingDelete,
    isErrorDelete,
    isSuccessDelete,
  };
};
