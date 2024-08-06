import React from "react";
import styled from "styled-components";
import { WishItemType } from "@components/wish/WishsGrid";

interface WishItemProps {
  item: WishItemType;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

function WishItem({ item, onClick, onDelete }: WishItemProps) {
  return (
    <ContentsItem>
      <ContentsItemImage src={item.image} alt="" onClick={() => onClick(item.id)} />
      <ContentsItemData>
        <span>{item.category3}</span>
      </ContentsItemData>
      <ProducPricetWrapper>
        <ContentsItemTitle>{item.title}</ContentsItemTitle>
        <ContentsItemPrice>
          {item.lprice}원
        </ContentsItemPrice>
      </ProducPricetWrapper>
      <DeleteButton onClick={() => onDelete(item.id)}>삭제</DeleteButton>
    </ContentsItem>
  );
}

export default WishItem;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const ContentsItem = styled.div`
  width: 250px;
  height: 320px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ContentsItemImage = styled.img`
  background-color: gray;
  width: 250px;
  height: 270px;
  box-sizing: border-box;
  position: relative;
`;

const ContentsItemData = styled.div`
  width: 250px;
  height: 25px;
  font-size: small;
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
  font-size: small;
  font-weight: bold;
  box-sizing: border-box;
`;

const ContentsItemPrice = styled.div`
  color: black;
  width: 85px;
  height: 25px;
  margin-left: 20px;
  font-size: small;
  font-weight: bold;
`;
