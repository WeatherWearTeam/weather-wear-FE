import styled from "styled-components";
import ClothesTag from "@components/ClothesTag";
import { getCreatedTime } from "@utils/getTime";
import { getSkyState } from "@utils/getWeather";
import { useNavigate } from "react-router-dom";
import { UserBoardsResponse } from "@api/boardApi";

interface MyBoardItemProps {
  item: UserBoardsResponse;
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
  const navigate = useNavigate();

  return (
    <ContentsItem>
      <ImageWrapper onClick={() => navigate(`/ootd/${item.id}`)}>
        <ContentsItemImage src={image} alt={"ootd image"} />
        {showTag && (
          <TagWrapper>
            {item.tags.map((tag, index: number) => (
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
          {showTitle && <ItemTitle>{item.title}</ItemTitle>}
        </ItemDataContainer>
      )}
    </ContentsItem>
  );
}

export default MyBoardItem;

const ContentsItem = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: ${({ theme }) => theme.borders.containerBorder};
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  width: 25rem;
  height: 30rem;
  box-sizing: border-box;
  position: relative;

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
  padding: 1rem;
  font-size: small;
  display: flex;
  height: 9rem;
  width: 24rem;
  flex-direction: column;
`;
const ItemCreatedAt = styled.p`
  font-size: small;
`;

const ItemTitle = styled.h2`
  font-size: medium;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.7rem;
`;
