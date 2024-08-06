import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createWishlistItem, getWishlistItems, deleteWishlistItem, WishlistItem, getWishlistItemById } from '@api/wishlistApi';

// 전체 조회
export const useWishlistItems = () => {
    const {
        data: wishlistItems,
        isPending,
        isError,
        isSuccess,
    } = useQuery<WishlistItem[]>({
        queryKey: ['wishlistItems'],
        queryFn: getWishlistItems
    });

    return { wishlistItems, isPending, isError, isSuccess };
};

// 개별 조회
export const useWishlistItem = (id: string) => {
    return useQuery<WishlistItem>({
        queryKey: ['wishlistItem', id],
        queryFn: () => getWishlistItemById(id),
        enabled: !!id,
    });
};

// 생성 기능
export const useCreateWishlistItem = () => {
    const queryClient = useQueryClient();

    return useMutation<WishlistItem, Error, WishlistItem>({
        mutationFn: createWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlistItems'] });
        },
    });
};

// 삭제 기능
export const useDeleteWishlistItem = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: deleteWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlistItems'] });
        },
    });
};