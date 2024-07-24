import styled from "styled-components";
import ClothesItem from "@components/ClothesItem";

export default function ClothesGrid() {
  return (
      <ContentsMain>
        <ClothesItem color="red" type="티셔츠" showTag={false} showData={true} showTitle={true} />
        <ClothesItem color="blue" type="원피스" showTag={false} showData={true} showTitle={true} />
        <ClothesItem color="green" type="바지" showTag={false} showData={true} showTitle={true} />
        <ClothesItem color="yellow" type="티셔츠" showTag={false} showData={true} showTitle={true} />
        <ClothesItem color="yellow" type="티셔츠" showTag={true} showData={true} showTitle={true} />
        <ClothesItem color="yellow" type="원피스" showTag={true} showData={true} showTitle={true} />
        <ClothesItem color="yellow" type="원피스" showTag={true} showData={true} showTitle={true} />
        <ClothesItem color="blue" type="바지" showTag={true} showData={true} showTitle={true} />
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
  padding: 20px 0 15px 0;
  @media (max-width: 1200px) {grid-template-columns: repeat(2, 2fr);} 
  // @media (max-width: 900px) {grid-template-columns: repeat(2, 2fr);} 
  @media (max-width: 600px) {grid-template-columns: 1fr;} 
`;
