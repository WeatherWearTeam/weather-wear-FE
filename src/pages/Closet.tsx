import { useEffect, useState } from "react";
import styled from "styled-components";
import PageMoveButton from "@components/PageMoveButton";
import AddButton from "@components/AddButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useClothesItems, useDeleteClothesItem } from "@queries/clothesQueries";
import ColorPickBar from "@components/Color/ColorPickBar";
import clothesTypeList from "@shared/clothesTypeList";
import ClosetList from "@components/Closet/ClosetList";
import Select from "@components/Select/Select";
import { ClothesKoreanType, ClothesType } from "@store/clothesTagStore";
import { ClothesColorType } from "@shared/colorTypeList";
import { SearchKeysRequest } from "@api/clothesApi";
import Pagination from "@components/pagination";

interface SelectedClothesState {
  type: ClothesType | null;
  typeKorean: ClothesKoreanType | "옷 종류";
}

function Closet() {
  const navigate = useNavigate();
  const location = useLocation();

  //////////////////////////////////////////////////////////////
  const [searchKeys, setSearchKeys] = useState<SearchKeysRequest>({
    page: 1,
    color: null,
    type: null,
  });

  const [selectedColor, setSelectedColor] = useState<ClothesColorType | null>(
    null
  );

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

  const handleColorChange = (newColor: ClothesColorType) => {
    setSearchKeys((prev) => ({
      ...prev,
      color: newColor,
      page: 1,
    }));
  };

  // 색상 클릭 핸들러
  const handleColorClick = (color: ClothesColorType) => {
    console.log("🌈", color);
    setSelectedColor(color); //url에 값 넣기
    handleColorChange(color); //실제 값 변경
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
  // 삭제 버튼 클릭 시 처리 로직
  const { mutateDeleteClothesItem } = useDeleteClothesItem();
  const handleDeleteClick = (id: number) => {
    const isConfirmed = confirm("아이템이 삭제되었습니다.");
    isConfirmed && mutateDeleteClothesItem(id);
  };

  //////////////////////////////////////////////////////////////

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (selectedClothesType.type) {
      queryParams.set("type", selectedClothesType.type);
    } else {
      queryParams.delete("type");
    }

    if (selectedColor) {
      queryParams.set("color", selectedColor);
    } else {
      queryParams.delete("color");
    }

    navigate(`?${queryParams.toString()}`);
  }, [selectedClothesType.type, selectedColor, navigate, location.search]);

  const { clothesItems, isPending, isError, isSuccess } =
    useClothesItems(searchKeys);

  return (
    <MyPageContentsContainer>
      <HeaderContainer>
        {/* <ClothesTypes onTypeClick={handleTypeClick} /> */}
        <SelectWrapper>
          <Select
            list={clothesTypeList}
            onClick={handleSelectType}
            value={selectedClothesType.typeKorean}
          />
        </SelectWrapper>
        <SelectWrapper>
          <ColorPickBar onClick={handleColorClick} />
        </SelectWrapper>
      </HeaderContainer>
      <MainContainer>
        {isSuccess && clothesItems?.content && (
          <ClosetList
            items={clothesItems.content}
            onDeleteClick={handleDeleteClick}
          />
        )}
        {isSuccess && clothesItems?.content.length < 1 && (
          <div>옷장에 옷이 없습니다.</div>
        )}
        {/* {isPending && <div>로딩중...</div>} */}
        {isError && <div>에러 발생!</div>}
      </MainContainer>
      <ContentsFooter>
        <Pagination
          totalPages={clothesItems?.totalPages} //총 아이템 수 //많아지면 버튼 생김
          pageCount={5} //5페이지씩 보여주기
          currentPage={
            searchKeys.page && searchKeys?.page > 0 ? searchKeys?.page : 1
          } //현재 페이지
          onPageChange={handlePageChange}
        />
        <AddButton onClick={() => navigate(`/mypage/closet/add`)} />
      </ContentsFooter>
    </MyPageContentsContainer>
  );
}

export default Closet;

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
  gap: 2rem;
  box-sizing: border-box;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const SelectWrapper = styled.div`
  flex: 1;
  width: 37rem;
  max-width: 37rem;
  box-sizing: border-box; /* 박스 사이징 모델을 설정하여 패딩과 보더를 포함하도록 설정 */
`;

const MainContainer = styled.div`
  max-width: 100rem;
`;
const ContentsFooter = styled.div`
  padding: 4rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1220px;
  /* flex-shrink: 0; */
`;
