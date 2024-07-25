import styled from "styled-components";

function MyOOTDItem() {
  return (
    <ContentsItem>
      <ContentsItemImage>마이페이지 이미지</ContentsItemImage>
    </ContentsItem>
  );
}

export default MyOOTDItem;

const ContentsItem = styled.div`
  width: 250px;
  height: 320px;
  box-sizing: border-box;
`;

const ContentsItemImage = styled.div`
  background-color: gray;
  width: 200px;
  height: 250px;
  box-sizing: border-box;
  border-radius: 15px;
`;
