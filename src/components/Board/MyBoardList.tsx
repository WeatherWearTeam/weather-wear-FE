import React from "react";
import styled from "styled-components";
import { Board } from "@queries/boardQueries";
import getKoreanType from "@utils/getKoreanType";
import { ClothesKoreanType } from "@shared/clothesTypeList";
import MyBoardItem from "@components/Board/MyBoardItem";
import { BoardResponse } from "@api/boardApi";
import EditDeleteButton from "@components/EditDeleteButton";

interface MyBoardListProps {
  items: BoardResponse[];
  onClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const MyBoardList: React.FC<MyBoardListProps> = ({
  items,
  onClick,
  onDeleteClick,
}) => {
  console.log(items);
  return (
    <ContentsMain>
      {items?.map((item) => (
        <ItemWrapper key={item.id} onClick={() => onClick(item.id)}>
          <MyBoardItem
            image={item.image}
            item={item}
            showTag={true}
            showData={true}
            showTitle={true}
          />
          <ButtonWrapper>
            <EditDeleteButton
              id={item.id}
              editPath={`/mypage/myootd/${item.id}/edit`}
              onMutateDelete={onDeleteClick}
            />
          </ButtonWrapper>
        </ItemWrapper>
      ))}
    </ContentsMain>
  );
};

export default MyBoardList;

const ContentsMain = styled.div`
  /* max-width: 1090px; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 2rem;
  padding: 0 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ItemWrapper = styled.div`
  cursor: pointer;
  position: relative;
  background-color: red;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
