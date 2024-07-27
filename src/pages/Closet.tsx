import styled from "styled-components";
import PageMoveButton from "@components/PageMoveButton";
import AddButton from "@components/AddButton";
import ColorBar from "@components/ColorBar";
import ClothesType from "@components/clothes/ClothesTypes";
import ClothesItem from "@components/clothes/ClothesItem"; // ClothesItem 컴포넌트 임포트
import { useNavigate } from "react-router-dom";

function Closet() {
  const navigate = useNavigate();
  return (
    <>
      <MypageContentsContainer>
        <ContentsHeader>
          <ClothesType />
          <ColorBar />
        </ContentsHeader>
        <ContentsMain>
          <ClothesItem
            color="blue"
            type="바지"
            showTag={true}
            showData={false}
            showTitle={false}
          />
          <ClothesItem
            color="red"
            type="바지"
            showTag={true}
            showData={false}
            showTitle={false}
          />
          <ClothesItem
            color="blue"
            type="바지"
            showTag={true}
            showData={false}
            showTitle={false}
          />
          <ClothesItem
            color="blue"
            type="바지"
            showTag={true}
            showData={false}
            showTitle={false}
          />
          <ClothesItem
            color="green"
            type="바지"
            showTag={true}
            showData={false}
            showTitle={false}
          />
        </ContentsMain>
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
