import React from "react";
import styled from "styled-components";
import getKoreanType from "@utils/getKoreanType";
import { ClothesItemType } from "@api/clothesApi";
import ClosetItem from "@components/Closet/ClosetItem";
import { ClothesKoreanType } from "@shared/clothesTypeList";

interface ClosetListProps {
  items: ClothesItemType[];
  onDeleteClick: (id: number) => void;
}

const ClosetList: React.FC<ClosetListProps> = ({ items, onDeleteClick }) => {
  return (
    <ContentsMain>
      {items?.map((item: ClothesItemType) => (
        <ClothesItemWrapper key={item.id}>
          <ClosetItem
            id={item.id}
            item={item}
            color={item.color}
            type={item.type}
            image={item.image}
            editPath={`/mypage/closet/${item.id}/edit`}
            onMutateDelete={onDeleteClick}
            showTag={true}
            showData={false}
            showTitle={false}
          />
        </ClothesItemWrapper>
      ))}
    </ContentsMain>
  );
};

export default ClosetList;

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

const ClothesItemWrapper = styled.div``;

// const ButtonContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 10px;
// `;

// const EditButton = styled.button`
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   cursor: pointer;
//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const DeleteButton = styled.button`
//   background-color: #f44336;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   cursor: pointer;
//   &:hover {
//     background-color: #e53935;
//   }
// `;
