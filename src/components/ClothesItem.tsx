import styled from "styled-components";
import ClothesTag from "./ClothesTag";

interface ClothesTagProps {
  color: string;
  type: string;
  showTag?: boolean; // ClothesTag 표시 여부
  showData?: boolean; // ContentsItemData 표시 여부
  showTitle?: boolean; // ContentsItemTitle 표시 여부
}

function ClothesItem({ 
  color,
  type,
  showTag = true,
  showData = true,
  showTitle = true
  }: ClothesTagProps) {
  return (
    <ContentsItem>
      <ContentsItemImage>
        마이페이지 이미지
        {showTag && (
          <TagWrapper>
            <ClothesTag color={color} type={type} />
          </TagWrapper>
        )}
      </ContentsItemImage>
      {showData && (
        <ContentsItemData>
          <span>data</span>
          <Color color={color} />
        </ContentsItemData>
      )}
      {showTitle && <ContentsItemTitle>이미지 제목</ContentsItemTitle>}
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
  position: relative; /* 상대 위치를 설정 */
`;

const TagWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
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