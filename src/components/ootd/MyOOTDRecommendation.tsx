import Button from "@components/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MyOotdData {
  id: number;
  image: string;
}

interface MyOOTDRecommendationProps {
  data: MyOotdData[];
}

const MyOOTDRecommendation = ({ data }: MyOOTDRecommendationProps) => {
  const navigate = useNavigate();

  console.log(data);

  // // 배열에서 4개의 요소를 랜덤으로 선택하는 함수
  // const getRandomSelection = (arr: MyOotdData[], num: number): MyOotdData[] => {
  //   const result = new Set<MyOotdData>();
  //   while (result.size < num) {
  //     const randomIndex = Math.floor(Math.random() * arr.length);
  //     result.add(arr[randomIndex]);
  //   }
  //   return Array.from(result);
  // };

  // const randomOotdData = getRandomSelection(data, 4);

  return (
    <Container>
      <Header>
        <ContentTitle>My OOTD 추천</ContentTitle>
        <HeaderContentContainer>
          <TextContainer>
            <ContentDescription>
              어떤 스타일을 입을지 고민 중이신가요?
            </ContentDescription>
            <ContentDescription>
              오늘 같은 날씨에 입었던 나의 OOTD를 참고해보세요.
            </ContentDescription>
            <ContentDescription>
              이전 아웃핏을 참고하여 오늘도 멋지게 스타일링 해보세요!
            </ContentDescription>
          </TextContainer>
          <Button
            type="button"
            buttonType="primary"
            onClick={() => navigate("/mypage/closet")}
          >
            나의 OOTD 바로가기
          </Button>
        </HeaderContentContainer>
      </Header>
      <ContentsMain>
        {data.map((item) => (
          <ImageWrapper
            key={item.id}
            id={`${item.id}`}
            onClick={() => navigate(`/ootd/${item.id}`)}
          >
            <Image src={item.image} alt="MyOOTD" />
          </ImageWrapper>
        ))}
      </ContentsMain>
    </Container>
  );
};

export default MyOOTDRecommendation;
const Container = styled.div`
  /* height: calc(100vh - 7rem); */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4rem 0;
  box-sizing: border-box;
  gap: 3rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  /* margin-bottom: 2rem; */
  @media (max-width: 768px) {
    align-items: center;
    gap: 2rem;
  }
`;

const HeaderContentContainer = styled.div`
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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-bottom: 1rem;
`;

///////////////////

// const GridContainer = styled.div`
//   padding-top: 3rem;
//   height: 50rem;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 3rem;
//   /* @media (max-width: 900px) {
//     grid-template-columns: repeat(2, 1fr);
//   } */

//   @media (max-width: 900px) {
//     grid-template-rows: 2fr;
//   }

//   @media (max-width: 900px) {
//   }

//   @media (max-width: 600px) {
//     height: 100%;
//   }
// `;

const ContentsMain = styled.div`
  /* max-width: 1090px; */
  /* display: grid; */
  /* grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 2rem;
  padding: 0 2rem;
 */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 3rem;
  object-fit: cover;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  width: 25rem;
  height: 35rem;
  border: ${({ theme }) => theme.borders.containerBorder};
  /* @media (max-width: 600px) {
    width: 80%;
    height: 100%;
  } */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Column = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border: ${({ theme }) => theme.borders.containerBorder};
  @media (max-width: 600px) {
    /* grid-template-columns: 1fr; */
    flex-wrap: wrap;
  }
`;
