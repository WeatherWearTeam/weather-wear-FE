import api from "@api/api";

export type ClothesItem = {
    id: number,
    color: string,
    type: string,
    image: string
}

// 전체 데이터 조회
export const getClothesItems = async (): Promise<ClothesItem[]> => {
    const response = await api.get('/clothes');
    // console.log("리스폰스 데이터", response.data);
    return response.data;
};


// 개별 데이터 조회
export const getClothesItemById  = async (id: number): Promise<ClothesItem> => {
    const response = await api.get(`/clothes/${id}`);
    return response.data;
};


// 생성
// export const createClothesItem  = async (item: ClothesItem): Promise<ClothesItem> => {
//     const response = await api.post('/clothes', item);
//     return response.data;
// };

// 생성2  //
export const createClothesItem = async (formData: FormData): Promise<ClothesItem> => {
    const response = await api.post('/clothes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };


// 수정
export const updateClothesItem = async (id: number, formData: FormData): Promise<ClothesItem> => {
  const response = await api.put(`/clothes/${id}`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
  return response.data;
};


// 삭제
export const deleteClothesItem = async (id: number): Promise<void> => {
    await api.delete(`/clothes/${id}`);
};
