import React, { useState } from "react";
import styled from "styled-components";
import SearchArea from "@components/SearchArea";
import ClothesGrid from "@components/ClothesGrid";
import PageMoveButton from "@components/PageMoveButton";
import AddButton from "@components/AddButton";
import { useNavigate } from "react-router-dom";

interface OOTDItem {
  id: string;
  color: string;
  type: string;
}

const initialOOTDData: OOTDItem[] = [
  { id: "1", color: "red", type: "티셔츠" },
  { id: "2", color: "blue", type: "원피스" },
  { id: "3", color: "green", type: "바지" },
  { id: "4", color: "yellow", type: "티셔츠" },
  { id: "5", color: "yellow", type: "티셔츠" },
  { id: "6", color: "yellow", type: "원피스" },
  { id: "7", color: "yellow", type: "원피스" },
  { id: "8", color: "blue", type: "바지" },
];

function Posts() {
  const navigate = useNavigate();
  const [ootdData, setOotdData] = useState<OOTDItem[]>(initialOOTDData);

  const handleItemClick = (id: string) => {
    navigate(`/ootd/${id}`);
  };

  return (
    <MypageContentsContainer>
      <SearchArea />
      <ClothesGrid items={ootdData} onItemClick={handleItemClick} />
      <ContentsFooter>
        <PageMoveButton />
        <AddButton onClick={() => navigate(`/ootd/add`)} />
      </ContentsFooter>
    </MypageContentsContainer>
  );
}

export default Posts;

const MypageContentsContainer = styled.div`
  width: 100%;
  height: 80vh;
  position: fixed;
  top: 175px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  overflow-y: auto;
`;

const ContentsFooter = styled.div`
  width: 85%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  max-width: 1220px;
  flex-shrink: 0;
`;
