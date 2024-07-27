import React from "react";
import styled from "styled-components";
import ClothesItem from "@components/clothes/ClothesItem";

interface OOTDItem {
  id: string;
  color: string;
  type: string;
}

interface ClothesGridProps {
  items: OOTDItem[];
  onItemClick: (id: string) => void;
}

const ClothesGrid: React.FC<ClothesGridProps> = ({ items, onItemClick }) => {
  return (
    <ContentsMain>
      {items.map((item) => (
        <ClothesItemWrapper key={item.id} onClick={() => onItemClick(item.id)}>
          <ClothesItem
            color={item.color}
            type={item.type}
            showTag={false}
            showData={true}
            showTitle={true}
          />
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
