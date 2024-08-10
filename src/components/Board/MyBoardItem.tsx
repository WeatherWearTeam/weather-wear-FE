import styled from "styled-components";
import ClothesTag from "@components/ClothesTag";
import { getCreatedTime } from "@utils/getTime";
import { getSkyState } from "@utils/getWeather";

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
            {item.tags.map((tag, index) => (
              <ClothesTag key={index} color={tag.color} type={tag.type} />
            ))}
          </TagWrapper>
        )}
      </ImageWrapper>
      {showData && (
        <ItemDataContainer>
          <ItemCreatedAt>{getCreatedTime(item.createdAt)}</ItemCreatedAt>
          <ItemCreatedAt>
            @{item.address} · {getSkyState(item.weather.sky)}
          </ItemCreatedAt>
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
`;

const ImageWrapper = styled.div`
  width: 25rem;
  height: 30rem;
  /* width: 100%;
  height: 100%; */
  box-sizing: border-box;
  position: relative;
  /* padding: 2rem; */
  border: ${({ theme }) => theme.borders.containerBorder};
  @media (max-width: 600px) {
    width: 100%;
    height: 50rem;
  }
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

// const Color = styled.div<{ color: string }>`
//   width: 1rem;
//   height: 1rem;
//   background-color: ${({ color }) => color};
//   border: ${({ theme }) => theme.borders.buttonBorder};
// `;
