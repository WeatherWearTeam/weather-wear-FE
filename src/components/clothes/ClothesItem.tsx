import styled from "styled-components";
import ClothesTag from "./ClothesTag";

interface ClothesItemProps {
  color: string;
  type: string;
  image: string;
  showTag?: boolean; // ClothesTag 표시 여부
  showData?: boolean; // ContentsItemData 표시 여부
  showTitle?: boolean; // ContentsItemTitle 표시 여부
}

function ClothesItem({ 
  color,
  type,
  image,
  showTag = false,
  showData = false,
  showTitle = false
}: ClothesItemProps) {
  return (
    <ContentsItem>
      <ContentsItemImage image={image}>
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
      {showTitle && <ContentsItemTitle>{type}</ContentsItemTitle>}
    </ContentsItem>
  );
}

export default ClothesItem;

const ContentsItem = styled.div`
  width: 250px;
  height: 320px;
  box-sizing: border-box;
`;

const ContentsItemImage = styled.div<{ image: string }>`
  background-image: url(${props => props.image});
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
  font-size: small;
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
  font-size: medium;
  font-weight: bold;
  box-sizing: border-box;
`;

const Color = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  background-color: ${({ color }) => color};
  border: ${({ theme }) => theme.borders.buttonBorder};
`;
