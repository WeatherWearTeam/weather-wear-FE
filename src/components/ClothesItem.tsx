import styled from "styled-components";
import ColorChip from "@components/ColorChip";

interface ClothesTagProps {
    color: string;
}

function ClothesItem({ color }: ClothesTagProps) {
    return (
        <ContentsItem>
            <ContentsItemImage>마이페이지 이미지</ContentsItemImage>
            <ContentsItemData>
                <span>data</span>
                <Color color={color} />
            </ContentsItemData>
            <ContentsItemTitle>이미지 제목</ContentsItemTitle>
        </ContentsItem>
    );
}

export default ClothesItem;

const ContentsItem = styled.div`
  width: 250px;
  height: 320px;
  box-sizing: border-box;
`;

const ContentsItemImage = styled.div`
  background-color: gray;
  width: 250px;
  height: 270px;
  box-sizing: border-box;
`;

const ContentsItemData = styled.div`
  width: 250px;
  height: 25px;
  font-size: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const ContentsItemTitle = styled.div`
  background-color: white;
  color: black;
  width: 250px;
  height: 25px;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
`;

const Color = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  background-color: ${({ color, theme }) => theme.colors[color]};
  border: ${({ theme }) => theme.borders.buttonBorder};
`;