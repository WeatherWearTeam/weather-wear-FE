import styled from "styled-components";
import PageMoveButton from "@components/PageMoveButton";
import AddButton from "@components/AddButton";
import ColorBar from "@components/ColorBar";
import ClothesType from "@components/ClothesTypes";
import ClothesItem from "@components/ClothesItem"; // ClothesItem 컴포넌트 임포트

function Trend() {
  return (
    <MypageContentsContainer>
      <ContentsHeader>
        <h1>OOTD 아이콘 추가</h1>
        <h1>검색기능</h1>
      </ContentsHeader>
      <ContentsMain>
        <ContentsItem>
          <ContentsItemImage></ContentsItemImage>
          <ContentsItemData>data</ContentsItemData>
          <ContentsItemTitle>트랜드 제목</ContentsItemTitle>
          <ContentsItemTagData>#오렌지 탑 #블랙 바지</ContentsItemTagData>
        </ContentsItem>
        
        
        
        
      </ContentsMain>
      <ContentsFooter>
        <PageMoveButton />
        <AddButton />
      </ContentsFooter>
    </MypageContentsContainer>
  );
} 

export default Trend;

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
  background-color: pink;
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

const ContentsItem = styled.div`
  width: 250px;
  height: 320px;
  box-sizing: border-box;
`;

const ContentsItemImage = styled.div`
  background-color: gray;
  width: 250px;
  height: 270px;
  box-sizing: border-box;
  position: relative;
`;

const ContentsItemData = styled.div`
  width: 250px;
  height: 25px;
  font-size: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const ContentsItemTagData = styled.div`
  width: 250px;
  height: 25px;
  font-size: 10px;
  box-sizing: border-box;
  justify-content: space-between;
`;

const ContentsItemTitle = styled.div`
  background-color: white;
  color: black;
  width: 250px;
  height: 25px;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
`;