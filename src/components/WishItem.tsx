import { WishItemType } from "@components/WishsGrid";
import styled from "styled-components";

interface WishItemProps {
  onClick: () => void;
  item: WishItemType;
}

function WishItem({ onClick, item }: WishItemProps) {
  return (
    <ContentsItem onClick={onClick}>
      <ContentsItemImage>{item.image}</ContentsItemImage>
      <ContentsItemData>
        <span>{item.category4}</span>
      </ContentsItemData>
      <ProducPricetWrapper>
        <ContentsItemTitle>{item.title}</ContentsItemTitle>
        <ContentsItemPrice>
          {item.lprice} ~ {item.hprice}
        </ContentsItemPrice>
      </ProducPricetWrapper>
    </ContentsItem>
  );
}

export default WishItem;

const ContentsItem = styled.div`
  width: 250px;
  height: 320px;
  box-sizing: border-box;
  cursor: pointer;
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
