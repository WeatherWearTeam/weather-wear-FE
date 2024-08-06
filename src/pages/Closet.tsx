import { useState } from 'react';
import styled from "styled-components";
import PageMoveButton from "@components/PageMoveButton";
import AddButton from "@components/AddButton";
import ColorBar from "@components/ColorBar";
import ClothesTypes from "@components/clothes/ClothesTypes";
import ClothesGrid from "@components/clothes/ClothesGrid";
import { useNavigate } from "react-router-dom";
import { useClothestItems } from "@queries/clothesQueries";
import { deleteClothesItem } from "@api/clothesApi"; // Ensure you import this correctly

function Closet() {
  const navigate = useNavigate();
  const { clothestItems, isPending, isError, refetch } = useClothestItems(); // Add refetch
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  // 선택된 색상에 따라 필터링된 아이템 리스트
  const filteredItems = clothestItems?.filter(item => {
    const matchesColor = selectedColor ? item.color === selectedColor : true;
    const matchesType = selectedType && selectedType !== 'All' ? item.type === selectedType : true;
    return matchesColor && matchesType;
  });

  // 수정 버튼 클릭 시 처리 로직
  const handleEditClick = (id: number) => {
    navigate(`/mypage/closet/edit/${id}`); // 수정 페이지로 이동
  };

  // 삭제 버튼 클릭 시 처리 로직
  const handleDeleteClick = async (id: number) => {
    try {
      await deleteClothesItem(id);
      alert("아이템이 삭제되었습니다.");
      refetch(); // 데이터 새로고침
    } catch (error) {
      alert("아이템 삭제에 실패했습니다.");
      console.error(error);
    }
  };

  // 색상 클릭 핸들러
  const handleColorClick = (color: string | null) => {
    console.log("Clicked Color:", color);
    setSelectedColor(color);
  };

  // 타입 클릭 핸들러
  const handleTypeClick = (type: string) => {
    console.log("Clicked Type:", type);
    setSelectedType(type);
  };

  console.log("Selected Color:", selectedColor);
  console.log("Selected Type:", selectedType);
  console.log("Filtered Items:", filteredItems);

  return (
    <>
      <MypageContentsContainer>
        <ContentsHeader>
          <ClothesTypes onTypeClick={handleTypeClick} />
          <ColorBar onClick={handleColorClick} />
        </ContentsHeader>
        <ClothesGrid
          items={filteredItems || []}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
        <ContentsFooter>
          <PageMoveButton />
          <AddButton onClick={() => navigate(`/mypage/closet/add`)} />
        </ContentsFooter>
      </MypageContentsContainer>
    </>
  );
}

export default Closet;

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

const ContentsFooter = styled.div`
  width: 85%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  max-width: 1220px;
  flex-shrink: 0;
`;
