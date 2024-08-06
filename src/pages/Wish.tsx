import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageMoveButton from "@components/PageMoveButton";
import ClothesType from "@components/clothes/ClothesTypes";
import WishsGrid from "@components/wish/WishsGrid";
import useModal from "@hooks/useModal";
import ModalPortal from "@components/Modal/ModalPortal";
import ModalLayout from "@components/Modal/ModalLayout";
import WishDetail from "@pages/WishDetail";
import { useWishlistItems, useDeleteWishlistItem, useWishlistItem } from "@/queries/wishlistQueries";

function Wish() {
  const { isVisible, openModal, closeModal } = useModal();
  const { wishlistItems, isPending, isError } = useWishlistItems();
  const { mutate: deleteWishlistItem } = useDeleteWishlistItem();
  
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { data: itemData, isLoading, error } = useWishlistItem(selectedItemId ? parseInt(selectedItemId) : undefined);

  //find 하나만 찾기 ***********중요
  const selectedItem = wishlistItems?.find((item) => item.id === selectedItemId);
  // console.log(wishlistItems);

  useEffect(() => {
    if (itemData) {
      // 선택된 아이템의 데이터가 변경되면 해당 데이터로 상태를 업데이트
      setSelectedItemId(itemData.id.toString());
    }
  }, [itemData]);

  useEffect(() => {
    if (error) {
      console.error("Error loading wishlist item:", error);
    }
  }, [error]);

  if (isPending || isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading wishlist items</div>;

  const handleDelete = (productId: number) => {
    deleteWishlistItem(productId);
  };

  const handleItemClick = (id: string) => {
    setSelectedItemId(id);
    openModal();
  };

  return (
    <MypageContentsContainer>
      <ContentsHeader>
        <ClothesType />
      </ContentsHeader>
      <ContentsMain>
        <WishsGrid 
          onClick={handleItemClick} 
          data={wishlistItems}
          onDelete={handleDelete}
        />
      </ContentsMain>
      <ContentsFooter>
        <PageMoveButton />
        {isVisible && selectedItemId && (
          <ModalPortal>
            <ModalLayout onClose={closeModal}>
              <WishDetail item={selectedItem} /> {/* itemData가 올바르게 전달됨 */}
            </ModalLayout>
          </ModalPortal>
        )}
      </ContentsFooter>
    </MypageContentsContainer>
  );
}

export default Wish;

const MypageContentsContainer = styled.div`
  width: 100%;
  height: 80vh;
  position: fixed;
  top: 175px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  overflow-y: auto;
`;

const ContentsHeader = styled.div`
  background-color: white;
  width: 100%;
  height: 60px;
  max-width: 1090px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
`;

const ContentsMain = styled.div`
  width: 85%;
  max-width: 1090px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 30px;
  padding: 20px 0 15px 0;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 2fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ContentsFooter = styled.div`
  margin-top: auto;
  margin-bottom: 5rem;
`;
