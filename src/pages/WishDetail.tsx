import React from "react";
import Button from "@components/Button";
import styled from "styled-components";
import { WishlistItem } from "@api/wishlistApi";

interface WishItemProps {
  item: any;
}

const WishDetail: React.FC<WishItemProps> = ({ item }) => {
  const { product } = item;

  return (
    <Container>
      <TitleContainer>
        <SubTitle>위시 리스트</SubTitle>
        <Title>{product.title}</Title>
      </TitleContainer>
      <GridContainer>
        <Column>
          <ImageWrapper>
            <img src={product.image} alt="네이버 쇼핑 추천 아이템" />
          </ImageWrapper>
        </Column>
        <Column>
          <RightWrapper>
            <UpContainer>
              <CategoryWrapper>
                {product.category1} / {product.category2} / {product.category3} /{" "}
                {product.category4}
                {/* 카테고리 정보가 없는 경우 처리 필요 */}
                {/* {product.type} */}
              </CategoryWrapper>
              <ProductNameWrapper>
                <ProductName>{product.title}</ProductName>
              </ProductNameWrapper>
              <DataWrapper>
                <InfoLabel>제조사</InfoLabel>
                <InfoData>{product.maker}</InfoData>
              </DataWrapper>
              <DataWrapper>
                <InfoLabel>브랜드</InfoLabel>
                <InfoData>{product.brand}</InfoData>
              </DataWrapper>
              <DataWrapper>
                <InfoLabel>판매처</InfoLabel>
                <InfoData>{product.mallName}</InfoData>
              </DataWrapper>
            </UpContainer>
            <DownContainer>
              <FlexRow>
                <LowHighlight>최저</LowHighlight>
                <LowPrice>{product.lprice}원</LowPrice>
                <HighHighlight>최고</HighHighlight>
                <HightPrice>{product.hprice}원</HightPrice>
              </FlexRow>
              <Button
                onClick={() => {
                  window.location.href = `${product.link}`;
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
};

export default WishDetail;

//✅ 상단 글 부분
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.WHITE};
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
  color: ${({ theme }) => theme.colors.BLACK};

  /* transition: border-bottom 0.25s linear; */
  /* 
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.BLACK};
    border-bottom: 1px solid ${({ theme }) => theme.colors.BLACK};
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
  color: ${({ theme }) => theme.colors.BLUE};
`;

const LowPrice = styled.h4`
  font-size: x-large;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.BLACK};
`;

const HighHighlight = styled.h5`
  font-size: small;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.RED};
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
  color: ${({ theme }) => theme.colors.BLACK};
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
