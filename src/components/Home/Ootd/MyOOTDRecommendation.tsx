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

  // console.log(data);

  // 배열에서 4개의 요소를 랜덤으로 선택하는 함수
  // const getRandomSelection = (arr: MyOotdData[], num: number): MyOotdData[] => {
  //   const result = new Set<MyOotdData>();
  //   while (result.size < num) {
  //     const randomIndex = Math.floor(Math.random() * arr.length);
  //     result.add(arr[randomIndex]);
  //   }
  //   return Array.from(result);
  // };

  // const randomOotdData = getRandomSelection(data, 4);

  const getFirstNElements = (arr: MyOotdData[], num: number): MyOotdData[] => {
    return arr.slice(0, num); // 배열의 앞부분에서 num만큼 슬라이스하여 반환
  };

  let firstFourOotdData: MyOotdData[] = [];
  if (data.length > 0) {
    firstFourOotdData = getFirstNElements(data, 4);
  }

  console.log(firstFourOotdData);
  return (
    <Container>
      <Header>
        <ContentTitle>어떤 스타일을 입을지 고민 중이신가요?</ContentTitle>
        <HeaderContentContainer>
          <TextContainer>
            {firstFourOotdData.length > 0 && (
              <>
                <ContentDescription>
                  오늘 같은 날씨에 입었던 나의 OOTD를 참고해보세요.
                </ContentDescription>
                <ContentDescription>
                  이전 아웃핏을 참고하여 오늘도 멋지게 스타일링 해보세요!
                </ContentDescription>
              </>
            )}
            {firstFourOotdData.length === 0 && (
              <>
                <ContentDescription>
                  현재 이 날씨에 어울리는 OOTD는 아직 등록되지 않았어요.
                </ContentDescription>
                <ContentDescription>
                  멋진 스타일을 더 많이 공유해 주시면, 더 나은 추천을 받을 수
                  있어요!
                </ContentDescription>
              </>
            )}
          </TextContainer>
          <Button
            type="button"
            buttonType="primary"
            onClick={() => navigate("/mypage/myootd")}
          >
            나의 OOTD 바로가기
          </Button>
        </HeaderContentContainer>
      </Header>
      <ContentsMain>
        {firstFourOotdData &&
          firstFourOotdData.map((item) => (
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
    padding: 0 2rem;
    h2 {
      font-size: x-large;
    }
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

const ContentsMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  gap: 4rem;
  object-fit: cover;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  width: 26rem;
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

// const Column = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 3rem;
//   border: ${({ theme }) => theme.borders.containerBorder};
//   @media (max-width: 600px) {
//     /* grid-template-columns: 1fr; */
//     flex-wrap: wrap;
//   }
// `;
