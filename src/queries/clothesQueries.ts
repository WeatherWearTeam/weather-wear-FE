import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClothesItem, getClothesItems, deleteClothesItem, ClothesItem, getClothesItemById, updateClothesItem } from '@api/clothesApi';

// 전체 조회
export const useClothestItems = () => {
    const {
        data: clothestItems,
        isPending,
        isError,
        isSuccess,
    } = useQuery<ClothesItem[]>({
        queryKey: ['clothestItems'],
        queryFn: getClothesItems
    });

    return { clothestItems, isPending, isError, isSuccess };
};

// 개별 데이터 조회
export const useClothesItemById = (id: number) => {
    const {
        data: clothesItem,
        isLoading,
        isError,
        isSuccess,
    } = useQuery<ClothesItem>({
        queryKey: ['clothesItem', id],
        queryFn: () => getClothesItemById(id)
    });

    return { clothesItem, isLoading, isError, isSuccess };
};


// 생성 기능
export const useCreateClothesItem = () => {
    const queryClient = useQueryClient();

    return useMutation<ClothesItem, Error, FormData>({
        mutationFn: createClothesItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clothestItems'] });
        },
        onError: (error) => {
            // 에러 처리
            console.error("Error creating clothes item:", error);
        }
    });
};


// 수정 기능
export const useUpdateClothesItem = () => {
    const queryClient = useQueryClient();

    return useMutation<ClothesItem, Error, { id: number, formData: FormData }>({
        mutationFn: ({ id, formData }) => updateClothesItem(id, formData),
        onSuccess: () => {
            // 데이터 수정 후, 전체 데이터 무효화
            queryClient.invalidateQueries({ queryKey: ['clothesItems'] });
        },
        onError: (error) => {
            // 에러 처리
            console.error("Error updating clothes item:", error);
        }
    });
};


// 삭제 기능
export const useDeleteClothesItem = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: deleteClothesItem,
        onSuccess: () => {
            // 데이터 삭제 후, 전체 데이터 무효화
            queryClient.invalidateQueries({ queryKey: ['clothesItems'] });
        },
        onError: (error) => {
            // 에러 처리
            console.error("Error deleting clothes item:", error);
        }
    });
};

