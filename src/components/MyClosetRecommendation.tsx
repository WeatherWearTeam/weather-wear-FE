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
  const getRandomSelection = (
    arr: MyClosetData[],
    num: number
  ): MyClosetData[] => {
    const result = new Set<MyClosetData>();
    while (result.size < num) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      result.add(arr[randomIndex]);
    }
    return Array.from(result);
  };

  const randomClothesData = getRandomSelection(data, 3);

  console.log(randomClothesData);

  return (
    <Container>
      <GridContainer>
        <Column>
          <RecommendItemWrapper id={`${randomClothesData[0]?.id}`}>
            <ImageWrapper>
              <RecommendItemImage
                src={randomClothesData[0]?.image}
                alt="my clothes"
              />
            </ImageWrapper>
            <ContentContainer>
              <TextContainer>
                <ContentTitle>내 옷장 속 옷 추천</ContentTitle>
                <ContentDescription>
                  {`내 옷장에 ${getKoreanColor(
                    randomClothesData[0].color
                  )} ${getKoreanType(randomClothesData[0].type)}이 있어요.`}
                  <br />
                  {"오늘 이 옷을 입어 보는건 어때요?"}
                  <br />
                  {"더 다양한 스타일 추천을 원한다면 옷을 추가해주세요!"}
                </ContentDescription>
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
        <Column>
          <Row>
            <RecommendItemWrapper id={`${randomClothesData[1]?.id}`}>
              <ImageWrapper>
                <RecommendItemImage
                  src={randomClothesData[1]?.image}
                  alt="my clothes"
                />
              </ImageWrapper>
              <ContentContainer>
                <TextContainer>
                  <ContentDescription>
                    {`내 옷장에 ${getKoreanColor(
                      randomClothesData[1].color
                    )} ${getKoreanType(randomClothesData[1].type)}이 있어요.`}
                  </ContentDescription>
                </TextContainer>
              </ContentContainer>
            </RecommendItemWrapper>
          </Row>
          <Row>
            <RecommendItemWrapper id={`${randomClothesData[2]?.id}`}>
              <ImageWrapper>
                <RecommendItemImage
                  src={randomClothesData[2]?.image}
                  alt="my clothes"
                />
              </ImageWrapper>
              <ContentContainer>
                <TextContainer>
                  <ContentDescription>
                    {`내 옷장에 ${getKoreanColor(
                      randomClothesData[2].color
                    )} ${getKoreanType(randomClothesData[2].type)}이 있어요.`}
                  </ContentDescription>
                </TextContainer>
              </ContentContainer>
            </RecommendItemWrapper>
          </Row>
        </Column>
      </GridContainer>
    </Container>
  );
}

// //✅ 페이지 아웃라인
// const Container = styled.div`
//   /* height: calc(100vh - 7rem); */
//   height: 100%;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 4rem;
//   gap: 1rem;
//   background-color: red;

//   @media (max-width: 900px) {
//     padding-top: 4rem;
//   }
// `;

///////////////////////////////////////////////////////////
// ✅ 페이지 아웃라인
const Container = styled.div`
  /* height: calc(100vh - 7rem); */
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

const ContentTitle = styled.h2`
  font-size: xx-large;
  font-weight: bold;
  color: black;
  text-shadow: 0px 0px 3px white;

  @media (max-width: 900px) {
    font-size: x-large;
  }
`;

const ContentDescription = styled.p`
  display: flex;
  font-size: large;
  color: white;
  text-shadow: 0px 0px 5px black;

  @media (max-width: 600px) {
    font-size: medium;
  }
`;

// {
//   /*
//         <TextContainer>
//           <ContentTitle>지금 웨더웨어를 시작해 보세요!</ContentTitle>
//           <ContentDescription>
//             웨더웨어는 날씨를 기반으로
//             <br />
//             개인 맞춤형 옷차림 추천 서비스를 제공하는 패션 커뮤니티입니다.
//             <br />
//             <br />
//             사용자들과 함께 OOTD 패션 스타일을 공유하고,
//             <br />
//             오늘의 날씨에 딱 맞는 나만의 특별한 OOTD로 스타일리시하게 하루를
//             시작해보세요!

//           </ContentDescription>
//         </TextContainer>
//         <Button onClick={() => navigate("/login")}>시작하기</Button> */
// }
// </ContentContainer>
// </Container>
