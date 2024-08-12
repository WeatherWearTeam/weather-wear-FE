import { useEffect, useState } from "react";
import styled from "styled-components";
import WishsGrid from "@components/Wish/WishsGrid";
import useModal from "@hooks/useModal";
import ModalPortal from "@components/Modal/ModalPortal";
import ModalLayout from "@components/Modal/ModalLayout";
import WishDetail from "@pages/Wish/WishDetail";
import {
  useWishlistItems,
  useDeleteWishlistItem,
} from "@/queries/wishlistQueries";
import { useLocation, useNavigate } from "react-router-dom";
import clothesTypeList, {
  ClothesKoreanType,
  ClothesType,
} from "@shared/clothesTypeList";
import Select from "@components/Select/Select";
import Pagination from "@components/pagination";
import { WishlistItem, WishSearchKeysRequest } from "@api/wishlistApi";

interface SelectedClothesState {
  type: ClothesType | null;
  typeKorean: ClothesKoreanType | "옷 종류";
}

function Wish() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchKeys, setSearchKeys] = useState<WishSearchKeysRequest>({
    page: 1,
    type: null,
  });

  const [selectedClothesType, setSelectedClothesType] =
    useState<SelectedClothesState>({
      type: null,
      typeKorean: "옷 종류", // 초기값을 null로 설정
    });

  const handlePageChange = (newPage: number) => {
    setSearchKeys((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleTypeChange = (newType: ClothesType) => {
    setSearchKeys((prev) => ({
      ...prev,
      type: newType,
      page: 1,
    }));
  };

  const handleSelectType = (
    type: ClothesType,
    typeKorean: ClothesKoreanType
  ) => {
    console.log("✅", selectedClothesType);

    setSelectedClothesType((prev) => ({
      ...prev,
      type,
      typeKorean,
    }));

    handleTypeChange(type);
  };

  //////////////////////////////////////////////////////////////

  //상세 보기 모달 열기
  const { isVisible, openModal, closeModal } = useModal();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setSelectedItemId(id);
    openModal();
  };

  //////////////////////////////////////////////////////////////
  //type으로 쿼리 검색 처리
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (selectedClothesType.type) {
      queryParams.set("type", selectedClothesType.type);
    } else {
      queryParams.delete("type");
    }

    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [selectedClothesType.type, navigate, location.search]);

  //////////////////////////////////////////////////////////////
  //위시리스트 아이템 조회하기
  const { wishlistItems, isPending, isError, isSuccess } =
    useWishlistItems(searchKeys);

  const selectedItem = wishlistItems?.content?.find(
    (item: WishlistItem) => item.id === selectedItemId
  );

  //////////////////////////////////////////////////////////////
  //위시리스트 아이템 삭제하기
  const { mutateDeleteWishlistItem } = useDeleteWishlistItem();
  console.log(wishlistItems);

  const handleDelete = (productId: number) => {
    mutateDeleteWishlistItem(productId);
  };
  //////////////////////////////////////////////////////////////

  return (
    <MyPageContentsContainer>
      <HeaderContainer>
        <SelectWrapper>
          <Select
            list={clothesTypeList}
            onClick={handleSelectType}
            value={selectedClothesType.typeKorean}
          />
        </SelectWrapper>
      </HeaderContainer>
      {isSuccess && wishlistItems && (
        <WishsGrid
          onClick={handleItemClick}
          data={wishlistItems.content}
          onDelete={handleDelete}
        />
      )}
      {isSuccess && wishlistItems?.content.length < 1 && (
        <div>
          아직 좋아요한 위시 리스트가가 없어요! 위시리스트를 추가해주세요.
        </div>
      )}
      {isPending && <div>로딩중...</div>}
      {isError && <div>위시리스트를 불러오지 못했습니다.</div>}
      {isVisible && (
        <ModalPortal>
          <ModalLayout onClose={closeModal}>
            <WishDetail item={selectedItem!} />
          </ModalLayout>
        </ModalPortal>
      )}
      <ContentsFooter>
        <Pagination
          totalPages={wishlistItems?.totalPages} //총 아이템 수 //많아지면 버튼 생김
          pageCount={5} //5페이지씩 보여주기
          currentPage={
            searchKeys.page && searchKeys?.page > 0 ? searchKeys?.page : 1
          } //현재 페이지
          onPageChange={handlePageChange}
        />
      </ContentsFooter>
    </MyPageContentsContainer>
  );
}

export default Wish;

const SelectWrapper = styled.div`
  flex: 1;
  width: 37rem;
  max-width: 37rem;
  box-sizing: border-box; /* 박스 사이징 모델을 설정하여 패딩과 보더를 포함하도록 설정 */
`;

const MyPageContentsContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  height: calc(100vh - 16rem);
  position: fixed;
  /* top: 17.5rem; */
  top: 16.2rem; //픽스 위치 조정
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
`;

const HeaderContainer = styled.div`
  width: 100%;
  /* max-width: 1220px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ContentsFooter = styled.div`
  padding: 4rem;
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1220px;
`;
