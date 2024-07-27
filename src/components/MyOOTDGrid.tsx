import styled from "styled-components";
import MyOOTDItem from "./MyOOTDItem";

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
  // @media (max-width: 900px) {grid-template-columns: repeat(2, 2fr);} 
  
  media (max-width: 600px) {
  grid-template-columns: 1fr;
  } 
`;