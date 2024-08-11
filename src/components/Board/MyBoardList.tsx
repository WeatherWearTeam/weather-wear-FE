import React from "react";
import styled from "styled-components";
import MyBoardItem from "@components/Board/MyBoardItem";
import { BoardByIdResponse } from "@api/boardApi";
import EditDeleteButton from "@components/EditDeleteButton";

interface MyBoardListProps {
  items: BoardByIdResponse[] | [];
  onDeleteClick: (id: number) => void;
  isSuccess: boolean;
}

const MyBoardList: React.FC<MyBoardListProps> = ({
  items,
  onDeleteClick,
  isSuccess,
}) => {
  return (
    <ContentsMain>
      {isSuccess &&
        items &&
        items.map((item) => (
          <ItemWrapper key={item.id}>
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
  position: relative;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 6.4rem;
  right: 0.8rem;
`;
