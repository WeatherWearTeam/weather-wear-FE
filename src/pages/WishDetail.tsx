import Button from "@components/Button";
import styled from "styled-components";

export default function WishDetail() {
  return (
    <Container>
      <TitleContainer>
        <SubTitle>위시 리스트</SubTitle>
        {/* <Title>{`상품 이름 여기에`}</Title> */}
      </TitleContainer>
      <GridContainer>
        <Column>
          <ImageWrapper>
            <img
              src="https://image.msscdn.net/images/goods_img/20240606/4180968/4180968_17181958693144_500.jpg"
              alt="네이버 쇼핑 추천 아이템"
            />
            {/* 이미지 로드 실패 시 예외 처리 필요 */}
          </ImageWrapper>
        </Column>
        <Column>
          <RightWrapper>
            {/*  */}
            <UpContainer>
              {/*  */}
              <CategoryWrapper>
                {`category1`} / {`category2`} / {`category3`} / {`category4`}
              </CategoryWrapper>
              {/*  */}
              {/*  */}
              <ProductNameWrapper>
                <ProductName>{`title: 상품 이름`}</ProductName>
              </ProductNameWrapper>
              {/*  */}
              {/*  */}
              <DataWrapper>
                <InfoLabel>제조사</InfoLabel>
                <InfoData>{`maker`}</InfoData>
              </DataWrapper>

              <DataWrapper>
                <InfoLabel>브랜드</InfoLabel>
                <InfoData>{`brand`}</InfoData>
              </DataWrapper>

              <DataWrapper>
                <InfoLabel>판매처</InfoLabel>
                <InfoData>{`mallName`}</InfoData>
              </DataWrapper>
              {/*  */}
            </UpContainer>
            <DownContainer>
              {/* <PriceContainer> */}
              <FlexRow>
                <LowHighlight>최저 </LowHighlight>
                <LowPrice>{`lprice`}원</LowPrice>
                <HightPrice> ~ </HightPrice>
                <HighHighlight>최고</HighHighlight>
                <HightPrice>{`hprice`}원</HightPrice>
              </FlexRow>
              {/* </PriceContainer> */}
              <Button
                onClick={() => {
                  // window.location.href = `${}`;
                  // 네이버 외부 링크 넣기
                }}
              >
                사러가기
              </Button>
            </DownContainer>
          </RightWrapper>
        </Column>
      </GridContainer>
    </Container>
  );
}

//✅ 상단 글 부분
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.borders.containerBorder};

  img {
    width: 100%;
    height: 100%;
    max-height: 600px; //✅ 어떻게 해야하나

    object-fit: cover;
  }
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  width: 30%;
  color: ${({ theme }) => theme.colors.borderLightGray};
  transition: color 0.25s linear;

  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

//✅ 오른쪽 레이아웃
export const RightWrapper = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: ${({ theme }) => theme.borders.containerBorder};
  border-left: none;
  @media (max-width: 600px) {
    border: ${({ theme }) => theme.borders.containerBorder};
    border-top: none;
  }
`;

const UpContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const DownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
  border-top: ${({ theme }) => theme.borders.containerBorder};
`;

// 위
const CategoryWrapper = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 1rem;
  font-size: x-small;
  padding-bottom: 2rem;
  border-bottom: ${({ theme }) => theme.borders.containerBorder};
`;

const ProductNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ theme }) => theme.borders.containerBorder};
`;

const ProductName = styled.h2`
  width: 100%;
  font-size: x-large;
  padding-bottom: 2rem;
  color: ${({ theme }) => theme.colors.black};

  /* transition: border-bottom 0.25s linear; */
  /* 
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.black};
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  } */
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const InfoLabel = styled.h3`
  font-size: small;
  font-weight: 800;
`;

const InfoData = styled.p`
  font-size: medium;
`;

//아래
const LowHighlight = styled.h4`
  font-size: x-large;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue};
`;

const LowPrice = styled.h4`
  font-size: x-large;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const HighHighlight = styled.h5`
  font-size: small;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red};
`;

const HightPrice = styled.h5`
  font-size: small;
  font-weight: 500;
`;

//✅
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

//✅ 페이지 아웃라인
const Container = styled.div`
  height: calc(100vh - 7rem);
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem 4rem 4rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 2rem;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: x-large;
`;

const SubTitle = styled.div`
  font-size: large;
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* gap: 3rem; */

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div``;
