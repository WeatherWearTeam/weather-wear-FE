import Button from "@components/Button";
import { ClothesType } from "@shared/clothesTypeList";
import { ClothesColorType } from "@shared/colorTypeList";
import getKoreanColor from "@utils/getKoreanColor";
import getKoreanType from "@utils/getKoreanType";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MyClosetData {
  id: number;
  image: string;
  color: ClothesColorType;
  type: ClothesType;
}

interface MyClosetRecommendationProps {
  data: MyClosetData[];
}
export default function MyClosetRecommendation({
  data,
}: MyClosetRecommendationProps) {
  const navigate = useNavigate();

  // 배열에서 3개의 요소를 랜덤으로 선택하는 함수
  // const getRandomSelection = (
  //   arr: MyClosetData[],
  //   num: number
  // ): MyClosetData[] => {
  //   const result = new Set<MyClosetData>();
  //   while (result.size < num) {
  //     const randomIndex = Math.floor(Math.random() * arr.length);
  //     result.add(arr[randomIndex]);
  //   }
  //   return Array.from(result);
  // };

  // const firstThreeClothesData = getRandomSelection(data, 3);

  //배열이 없거나 배열길이가 요청하는 num 보다 작은 경우 무한 루프 발생 ㅠ.ㅠ

  const getFirstNElements = (
    arr: MyClosetData[],
    num: number
  ): MyClosetData[] => {
    return arr.slice(0, num); // 배열의 앞부분에서 num만큼 슬라이스하여 반환
  };

  let firstThreeClothesData: MyClosetData[] = [];
  if (data.length > 0) {
    firstThreeClothesData = getFirstNElements(data, 3);
  }

  return (
    <Container>
      {firstThreeClothesData && firstThreeClothesData[0] && (
        <GridContainer>
          <Column>
            <RecommendItemWrapper id={`${firstThreeClothesData[0]?.id}`}>
              <ImageWrapper>
                <RecommendItemImage
                  src={firstThreeClothesData[0]?.image}
                  alt="my clothes"
                />
              </ImageWrapper>
              <ContentContainer>
                <TextContainer>
                  <Title>내 옷장 속 옷 추천</Title>
                  <Description>
                    {`내 옷장에 ${getKoreanColor(
                      firstThreeClothesData[0].color
                    )} ${getKoreanType(
                      firstThreeClothesData[0].type
                    )}이 있어요.`}
                    <br />
                    {"오늘 이 옷을 입어 보는건 어때요?"}
                    <br />
                    {"더 다양한 스타일 추천을 원한다면 옷을 추가해주세요!"}
                  </Description>
                  <Button
                    type="button"
                    onClick={() => navigate("/mypage/closet")}
                  >
                    내 옷장 바로가기
                  </Button>
                </TextContainer>
              </ContentContainer>
            </RecommendItemWrapper>
          </Column>

          {firstThreeClothesData && firstThreeClothesData[1] && (
            <Column>
              <Row>
                <RecommendItemWrapper id={`${firstThreeClothesData[1]?.id}`}>
                  <ImageWrapper>
                    <RecommendItemImage
                      src={firstThreeClothesData[1]?.image}
                      alt="my clothes"
                    />
                  </ImageWrapper>
                  <ContentContainer>
                    <TextContainer>
                      <Description>
                        {`내 옷장에 ${getKoreanColor(
                          firstThreeClothesData[1].color
                        )} ${getKoreanType(
                          firstThreeClothesData[1].type
                        )}이 있어요.`}
                      </Description>
                    </TextContainer>
                  </ContentContainer>
                </RecommendItemWrapper>
              </Row>
              {firstThreeClothesData && firstThreeClothesData[2] && (
                <Row>
                  <RecommendItemWrapper id={`${firstThreeClothesData[2]?.id}`}>
                    <ImageWrapper>
                      <RecommendItemImage
                        src={firstThreeClothesData[2]?.image}
                        alt="my clothes"
                      />
                    </ImageWrapper>
                    <ContentContainer>
                      <TextContainer>
                        <Description>
                          {`내 옷장에 ${getKoreanColor(
                            firstThreeClothesData[2].color
                          )} ${getKoreanType(
                            firstThreeClothesData[2].type
                          )}이 있어요.`}
                        </Description>
                      </TextContainer>
                    </ContentContainer>
                  </RecommendItemWrapper>
                </Row>
              )}
            </Column>
          )}
        </GridContainer>
      )}
      {/* 빈배열인 경우 */}
      {!firstThreeClothesData ||
        (firstThreeClothesData.length === 0 && (
          <NoneDataContainer>
            <ContentTitle>내 옷장을 더 풍성하게 채워 보세요!</ContentTitle>
            <ContentWrapper>
              <TextWrapper>
                <ContentDescription>
                  현재 날씨에 맞는 옷이 아직 등록되지 않았어요.
                </ContentDescription>
                <ContentDescription>
                  새로운 옷을 추가하시면, 내 옷장을 기반으로 나에게 딱 맞는
                  추천을 받을 수 있어요!
                </ContentDescription>
              </TextWrapper>
              <Button type="button" onClick={() => navigate("/mypage/closet")}>
                내 옷장 바로가기
              </Button>
            </ContentWrapper>
          </NoneDataContainer>
        ))}
    </Container>
  );
}

///////////////////////////////////////////////////////////
// 페이지 아웃라인
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4rem 0;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding-top: 4rem;
  }
`;

const GridContainer = styled.div`
  height: 50rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  /* @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  } */
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    height: 100%;
  }
`;

const Column = styled.div`
  width: 100%;
  height: 50rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Row = styled.div`
  height: 23.5rem; //50-갭 값
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

//////////////////////////////////////

const RecommendItemWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: ${({ theme }) => theme.borders.containerBorder};
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const RecommendItemImage = styled.img`
  padding: 0 5rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
//////////////////////////////////////

const ContentContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  /* max-width: 1200px; */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5rem;

  button {
    width: 15rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 2rem;
  padding-left: 2rem;
`;

const Title = styled.h2`
  font-size: xx-large;
  font-weight: bold;
  color: black;
  text-shadow: 0px 0px 3px white;

  @media (max-width: 900px) {
    font-size: x-large;
  }
`;

const Description = styled.p`
  display: flex;
  font-size: large;
  color: white;
  text-shadow: 0px 0px 5px black;

  @media (max-width: 600px) {
    font-size: medium;
  }
`;

///////////////////////////////////////////

const NoneDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  /* margin-bottom: 2rem; */
  @media (max-width: 768px) {
    align-items: center;
    gap: 2rem;
    padding: 0 2rem;
    h2 {
      font-size: x-large;
    }
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  button {
    width: 20rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ContentTitle = styled.h2`
  font-size: xx-large;
  margin-bottom: 1rem;
  color: black;
  font-weight: bold;
`;

const ContentDescription = styled.p`
  font-size: medium;
`;
