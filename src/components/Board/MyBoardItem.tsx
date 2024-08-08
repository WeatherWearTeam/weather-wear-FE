import styled, { css } from "styled-components";
import ClothesTag from "@components/ClothesTag";
import { getCreatedTime } from "@utils/getTime";
import EditDeleteButton from "@components/EditDeleteButton";
import { ClothesColorType } from "@shared/colorTypeList";
import { ClothesKoreanType, ClothesType } from "@shared/clothesTypeList";

interface MyBoardItemProps {
  item?: any;
  image: string;

  showTag?: boolean; // ClothesTag 표시 여부
  showData?: boolean; // ItemDataContainer 표시 여부
  showTitle?: boolean; // ItemTitle 표시 여부
}

function MyBoardItem({
  item,
  image,
  showTag = false,
  showData = false,
  showTitle = false,
}: MyBoardItemProps) {
  return (
    <ContentsItem>
      <ImageWrapper>
        <ContentsItemImage src={image} alt={"ootd image"} />
        {showTag && (
          <TagWrapper>
            {item.tags.map((tag) => (
              <ClothesTag color={tag.color} type={tag.type} />
            ))}
          </TagWrapper>
        )}
      </ImageWrapper>
      {showData && (
        <ItemDataContainer>
          <ItemCreatedAt>{getCreatedTime(item.createdAt)}</ItemCreatedAt>
        </ItemDataContainer>
      )}
      {showTitle && <ItemTitle>{item.title}</ItemTitle>}
      {showTitle && <ContentsItemTitle>{item.type}</ContentsItemTitle>}
    </ContentsItem>
  );
}

export default MyBoardItem;

const ContentsItem = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: blue;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 2rem;
  border: ${({ theme }) => theme.borders.containerBorder};
`;

const ContentsItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
`;

const TagWrapper = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemDataContainer = styled.div`
  padding-top: 1rem;
  font-size: small;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ItemCreatedAt = styled.p`
  font-size: small;
`;

const ItemTitle = styled.h2`
  font-size: medium;
  font-weight: bold;
`;
const ContentsItemTitle = styled.h2`
  font-size: medium;
  font-weight: bold;
`;

// const Color = styled.div<{ color: string }>`
//   width: 1rem;
//   height: 1rem;
//   background-color: ${({ color, theme }) => theme.colors[color]};
//   border: ${({ theme }) => theme.borders.buttonBorder};
// `;

const Color = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  background-color: ${({ color }) => color};
  border: ${({ theme }) => theme.borders.buttonBorder};
`;
