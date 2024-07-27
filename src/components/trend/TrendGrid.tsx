import styled from "styled-components";
import TrendItem from "@components/trend/TrendItem";

export default function TrendGrid() {
  return (
      <ContentsMain>
        <TrendItem />
        <TrendItem />
        <TrendItem />
        <TrendItem />
        <TrendItem />
        <TrendItem />
        <TrendItem />
        <TrendItem />
      </ContentsMain>
  );
}

const ContentsMain = styled.div`
  width: 85%;
  max-width: 1090px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 40px 30px;
  padding: 20px 0 15px 0;
  @media (max-width: 1200px) {grid-template-columns: repeat(2, 2fr);} 
  // @media (max-width: 900px) {grid-template-columns: repeat(2, 2fr);} 
  @media (max-width: 600px) {grid-template-columns: 1fr;} 
`;
