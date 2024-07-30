import styled from "styled-components";
import MyOOTDItem from "@components/ootd/MyOOTDItem";

export default function MyOOTDGrid() {
  return (
    <ContentsMain>
        <MyOOTDItem />
        <MyOOTDItem />
        <MyOOTDItem />
        <MyOOTDItem />
    </ContentsMain>
  );
}

const ContentsMain = styled.div`
  width: 95%;
  max-width: 1090px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 30px;
  padding: 20px 0 15px 0;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 980px) {
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  } 
  // @media (max-width: 900px) {grid-template-columns: repeat(2, 2fr);} 
  
  @media (max-width: 600px) {
  grid-template-columns: 1fr;
  justify-content: center;
  } 
`;
