import Button from "@components/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface OotdTrendData {
  id: number;
  image: string;
}

interface OotdTrendProps {
  data: OotdTrendData[];
}

const OOTDTrend = ({ data }: OotdTrendProps) => {
  const navigate = useNavigate();

  // console.log("data", data);

  return (
    <Container>
      {data.length > 0 && (
        <GridContainer>
          <Column>
            <MainImageContainer
              onClick={() => {
                navigate(`/ootd/${data[0].id}`);
              }}
            >
              <Image id={`${data[0].id}`} src={data[0].image} />
            </MainImageContainer>
          </Column>
          <Column>
            <Banner>
              <BannerContainer>
                <Title>다른 사람들은 어떻게 스타일링 했을까요?</Title>
                <Content>
                  <TextContainer>
                    <Text>
                      가장 인기있는 <HighLightText>OOTD</HighLightText>
                      <SmallText>Outfit Of The Day</SmallText> 트렌드 게시물을
                      확인해 보세요.
                    </Text>
                    <Text>
                      유니크한 패션 아이디어와 트렌디한 룩을 한눈에 만날 수
                      있어요!
                    </Text>
                  </TextContainer>
                  <Button onClick={() => navigate("/ootd")}>
                    OOTD 트렌드 보러가기
                  </Button>
                </Content>
              </BannerContainer>
            </Banner>
            {data.length > 1 && (
              <Row>
                {data.slice(1).map((item: OotdTrendData) => (
                  <ImageContainer
                    key={item.id}
                    onClick={() => {
                      navigate(`/ootd/${item.id}`);
                    }}
                  >
                    <Image id={`${item.id}`} src={item.image} />
                  </ImageContainer>
                ))}
              </Row>
            )}
          </Column>
        </GridContainer>
      )}

      {data.length === 0 && (
        <Banner>
          <BannerContainer>
            <Title>다른 사람들은 어떻게 스타일링 했을까요?</Title>
            <Content>
              <TextContainer>
                <Text>
                  가장 인기있는 <HighLightText>OOTD</HighLightText>
                  <SmallText>Outfit Of The Day</SmallText> 트렌드 게시물을
                  확인해 보세요.
                </Text>
                <Text>
                  유니크한 패션 아이디어와 트렌디한 룩을 한눈에 만날 수 있어요!
                </Text>
              </TextContainer>
              <Button onClick={() => navigate("/ootd")}>
                OOTD 트렌드 보러가기
              </Button>
            </Content>
          </BannerContainer>
        </Banner>
      )}
    </Container>
  );
};

export default OOTDTrend;

//✅ 페이지 아웃라인
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4rem 0;
  overflow: auto;
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  min-height: 20rem;
`;

const Banner = styled.div`
  /* border: 1px solid yellow; */
  height: 60%;
  min-height: 20rem;
`;

const Row = styled.div`
  /* border: 1px solid red; */
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* display: flex;
flex-direction: row; */
  gap: 3rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const MainImageContainer = styled.div`
  width: 100%;
  height: 50rem;
  border: ${({ theme }) => theme.borders.containerBorder};
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 27rem;
  border: ${({ theme }) => theme.borders.containerBorder};
  cursor: pointer;

  @media (max-width: 600px) {
    height: 50rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

////////////////////////////////////////////////////////

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 3rem;

  button {
    width: 20rem;
  }

  @media (max-width: 600px) {
    padding: 0 2rem;
  }
`;

const Title = styled.h3`
  font-size: xx-large;
  color: black;
  font-weight: bold;
  @media (max-width: 1200px) {
    font-size: x-large;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-size: medium;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: medium;
  gap: 0.5rem;
  @media (max-width: 600px) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const Text = styled.p`
  font-size: medium;
`;

const HighLightText = styled.span`
  font-size: medium;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.BLACK};
`;

const SmallText = styled.small`
  font-size: x-small;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.BLACK};
`;
