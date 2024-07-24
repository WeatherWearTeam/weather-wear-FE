import styled from "styled-components";
import ClothesItem from "@components/ClothesItem";

export default function ClothesGrid() {
    return (
        <ContentsMain>
            <ClothesItem />
            <ClothesItem />
            <ClothesItem />
            <ClothesItem />
            <ClothesItem />
            <ClothesItem />
            <ClothesItem />
            <ClothesItem />
        </ContentsMain>
    );
}

const ContentsMain = styled.div`
  width: 85%;
  max-width: 1090px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 30px;
  padding: 75px 0 15px 0;
`;