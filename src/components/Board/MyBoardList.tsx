import React, { useEffect } from "react";
import styled from "styled-components";
import { Board } from "@queries/boardQueries";
import getKoreanType from "@utils/getKoreanType";
import { ClothesKoreanType } from "@shared/clothesTypeList";
import MyBoardItem from "@components/Board/MyBoardItem";
import { BoardByIdResponse } from "@api/boardApi";
import EditDeleteButton from "@components/EditDeleteButton";
import { useNavigate } from "react-router-dom";

interface MyBoardListProps {
  items: BoardByIdResponse[] | [];
  onClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
  isSuccess: boolean;
}

const MyBoardList: React.FC<MyBoardListProps> = ({
  items,
  onClick,
  onDeleteClick,
  isSuccess,
}) => {
  const navigate = useNavigate();
  console.log("🌈🌈", items);

  return (
    <ContentsMain>
      {isSuccess &&
        items &&
        items.map((item) => (
          <ItemWrapper
            key={item.id}
            onClick={() => navigate(`/ootd/${item.id}`)}
          >
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
  width: 100%;
  height: 100%;
  /* background-color: red; */
`;

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 2.5rem;
  right: 0.2rem;
`;
