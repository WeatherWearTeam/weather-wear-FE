import styled from "styled-components";
import SearchArea from "@components/SearchArea";
import ClothesGrid from "@components/ClothesGrid";
import PageMoveButton from "@components/PageMoveButton";
import AddButton from "@components/AddButton";

function Posts() {
  return (
    <MypageContentsContainer>
      <SearchArea />
      <ClothesGrid />
      <ContentsFooter>
        <PageMoveButton />
        <AddButton />
      </ContentsFooter>
    </MypageContentsContainer>
  );
}

export default Posts;

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
