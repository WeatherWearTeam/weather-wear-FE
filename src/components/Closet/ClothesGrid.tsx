import React from "react";
import styled from "styled-components";
import ClosetItem from "@components/Closet/ClosetItem";
import { ClothesItem as ClothesItemType } from "@api/clothesApi";

// interface OOTDItem {
//   id: string;
//   color: string;
//   type: string;
// }

interface ClothesGridProps {
  items: ClothesItemType[];
  onItemClick: (id: number) => void;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const ClothesGrid: React.FC<ClothesGridProps> = ({
  items,
  onItemClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <ContentsMain>
      {items.map((item) => (
        <ClothesItemWrapper key={item.id} onClick={() => onItemClick(item.id)}>
          <ClosetItem
            color={item.color}
            type={item.type}
            image={item.image}
            showTag={true}
            showData={false}
            showTitle={false}
          />
          <ButtonContainer>
            <EditButton onClick={() => onEditClick(item.id)}>수정</EditButton>
            <DeleteButton onClick={() => onDeleteClick(item.id)}>
              삭제
            </DeleteButton>
          </ButtonContainer>
        </ClothesItemWrapper>
      ))}
    </ContentsMain>
  );
};

export default ClothesGrid;

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

const ClothesItemWrapper = styled.div`
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #e53935;
  }
`;
