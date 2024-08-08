import styled, { css } from "styled-components";
import ClothesTag from "@components/ClothesTag";
import { getCreatedTime } from "@utils/getTime";
import EditDeleteButton from "@components/EditDeleteButton";
import { ClothesColorType } from "@shared/colorTypeList";
import { ClothesType } from "@shared/clothesTypeList";

interface ClosetItemProps {
  item?: any;
  id: number;
  color: ClothesColorType;
  type: ClothesType;
  image: string;
  editPath: string;
  onMutateDelete: (id: number) => void;
  showTag?: boolean; // ClothesTag 표시 여부
  showData?: boolean; // ItemDataContainer 표시 여부
  showTitle?: boolean; // ItemTitle 표시 여부
}

function ClosetItem({
  item,
  id,
  color,
  type,
  image,
  editPath,
  onMutateDelete,
  showTag = false,
  showData = false,
  showTitle = false,
}: ClosetItemProps) {
  console.log("🌈", type);
  console.log("🌈", item);
  return (
    <ContentsItem>
      <ImageWrapper>
        <ContentsItemImage src={image} alt={"clothes image"} />
        <ButtonWrapper>
          <EditDeleteButton
            id={id}
            editPath={editPath}
            onMutateDelete={onMutateDelete}
          />
        </ButtonWrapper>
        {showTag && (
          <TagWrapper>
            <ClothesTag color={color} type={type} />
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

export default ClosetItem;

const ContentsItem = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* background-color: red; */
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  /* padding: 2rem; */
  border: ${({ theme }) => theme.borders.containerBorder};
`;

const ContentsItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const TagWrapper = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
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
