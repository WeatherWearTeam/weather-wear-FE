import styled from "styled-components";

function WishItem() {
  return (
    <ContentsItem>
      <ContentsItemImage>마이페이지 이미지</ContentsItemImage>
      <ContentsItemData>
        <span>티셔츠 Product Type_</span>
      </ContentsItemData>
      <ProducPricetWrapper>
        <ContentsItemTitle>제품명</ContentsItemTitle>
        <ContentsItemPrice>10,000~15,000</ContentsItemPrice>
      </ProducPricetWrapper>
    </ContentsItem>
  );
}

export default WishItem;

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

const ProducPricetWrapper = styled.div`
  display: flex; /* 수평으로 배치 */
  justify-content: space-between; /* 양 끝에 배치 */
  width: 250px;
  box-sizing: border-box;
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

const ContentsItemPrice = styled.div`
  color: black;
  width: 250px;
  height: 25px;
  margin-left: 60px;
  font-size: 12px;
  font-weight: bold;
`;