import styled from "styled-components";
import Icon from "@components/Icon";
import {
  atIcon,
  chatIcon,
  eyeIcon,
  eyeOffIcon,
  hashtagIcon,
  heartIcon,
} from "@shared/icons";
import { getSkyState } from "@utils/getWeather";
import getKoreanColor from "@utils/getKoreanColor";
import getKoreanType from "@utils/getKoreanType";
import { ClothesColorType } from "@shared/colorTypeList";
import { ClothesType } from "@shared/clothesTypeList";
import { TrendItemResponse } from "@api/trendApi";
import { useNavigate } from "react-router-dom";
import Avatar from "@components/Avatar";
import { getTimesAgo } from "@utils/getTime";

interface TrendItemProps {
  item: TrendItemResponse;
}

const TrendItem = ({ item }: TrendItemProps) => {
  const navigate = useNavigate();
  return (
    <ContentsItem
      id={`${item.id}`}
      onClick={() => {
        navigate(`/ootd/${item.id}`);
      }}
    >
      {/* 이미지 */}
      <ImageWrapper>
        <ContentsItemImage src={item?.image} alt={"ootd trend image"} />
      </ImageWrapper>

      <Column>
        {/* 유저 정보 */}
        <UserInfoContainer>
          <Avatar size="s" image={item.user?.image} />
          <UserInfoWrapper>
            <UserInfoSub>
              <Text>{item.user?.nickname}</Text>
              {` · `}
              {getTimesAgo(item.createdAt)}
            </UserInfoSub>
            <UserInfoSub>
              {atIcon}
              {item.address?.split(" ")[0]} {item.weather?.tmp}°C{" "}
              {getSkyState(item.weather?.sky as number)}
            </UserInfoSub>
          </UserInfoWrapper>
        </UserInfoContainer>

        {/* 제목 */}
        <TitleWrapper>
          <ItemTitle>{item.title}</ItemTitle>
        </TitleWrapper>
        {/* 태그 */}
        <ContentsItemTagData>
          {item.tags?.map((tag: ClothesTag, index: number) => (
            <HashtagWrapper key={index}>
              <Icon icon={hashtagIcon} />
              {getKoreanColor(tag.color as ClothesColorType)}{" "}
              {getKoreanType(tag.type as ClothesType)}
            </HashtagWrapper>
          ))}
        </ContentsItemTagData>

        {/* 아이콘 */}
        <ItemInfoContainer>
          <ItemDataContainer>
            <IconContainer>
              {!item.isPrivate ? (
                <Icon icon={eyeIcon} />
              ) : (
                <Icon icon={eyeOffIcon} />
              )}
              <Text>{item.views}</Text>
              <Icon icon={heartIcon} />
              <Text>{item.boardLikesCount}</Text>
              <Icon icon={chatIcon} />
              <Text>{item.commentsCount}</Text>
            </IconContainer>
          </ItemDataContainer>
        </ItemInfoContainer>
      </Column>
    </ContentsItem>
  );
};

export default TrendItem;

const ContentsItem = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: ${({ theme }) => theme.borders.containerBorder};
  gap: 1rem;
`;
//////////////////////////////////////////////////////

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
`;
//////////////////////////////////////////////////////

const UserInfoContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const UserInfoWrapper = styled.div`
  /* gap: 0.1rem; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const UserInfoSub = styled.div`
  gap: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: x-small;
  svg {
    width: 1.3rem;
    height: 1.3rem;
  }
`;

//////////////////////////////////////////////////////

const ImageWrapper = styled.div`
  width: 25rem;
  height: 30rem;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: ${({ theme }) => theme.borders.containerBorder};

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

//////////////////////////////////////////////////////

const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem 0;
  border-top: ${({ theme }) => theme.borders.containerBorder};

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ItemDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: small;
`;

const ContentsItemTagData = styled.div`
  display: flex;
  font-size: 10px;
  box-sizing: border-box;
  gap: 10px;
`;

const HashtagWrapper = styled.div`
  display: flex;
  font-size: x-small;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const Text = styled.p`
  font-size: small;
`;

const TitleWrapper = styled.div`
  width: 23rem; //전체 25-양옆패딩2
`;

const ItemTitle = styled.p`
  height: 100%;
  font-size: medium;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1rem 0;
`;
