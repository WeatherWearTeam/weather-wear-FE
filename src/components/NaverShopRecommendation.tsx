import React from 'react';
import styled from 'styled-components';
import LikeButton from '@components/LikeButton';

interface NaverShopRecommendationProps {
    liked: boolean[];
    toggleLike: (index: number) => void;
}

const NaverShopRecommendation: React.FC<NaverShopRecommendationProps> = ({ liked, toggleLike }) => {
    return (
        <HomeContents5>
            <NaverShopGrid>
                <NaverShopImage1></NaverShopImage1>
                <NaverShopImage2></NaverShopImage2>
                <NaverShopImage3></NaverShopImage3>
                {[0, 1, 2].map((index) => (
                    <NaverShopData key={index}>
                        <NaverShopDataText>
                            <NaverShopDataType>티셔츠Product Type_</NaverShopDataType>
                            <NaverShopDataTitle>제품명 (title)</NaverShopDataTitle>
                        </NaverShopDataText>
                        <LikeButton active={liked[index]} onClick={() => toggleLike(index)} />
                    </NaverShopData>
                ))}
                <NaverShopText>
                    <HomeTitle>네이버 쇼핑에서 추천해요</HomeTitle>
                    <HomeContent>
                        요즘 날씨에 맞는 구매하기 좋은 옷을 추천드려요!<br />
                        저희가 추천드린 옷이 마음에 든다면 하트를 눌러 위시리스트에 저장해 보세요.
                    </HomeContent>
                </NaverShopText>
            </NaverShopGrid>
        </HomeContents5>
    );
};

export default NaverShopRecommendation;

const HomeContents5 = styled.div`
  width: 80%;
  height: 450px;
  flex-direction: column;
  position: static;
  margin: 40px 0;
`;

const NaverShopGrid = styled.div`
  justify-content: center; 
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(3, 260px);
  grid-gap: 5px 50px;
  grid-template-rows: 210px 50px 200px;
  grid-template-areas: 
      'a b c '
      'd e f '
      'g g g '
`;

const NaverShopImage1 = styled.div`
  grid-area: a;
  background-color: gray;
  box-sizing: border-box;
`;

const NaverShopImage2 = styled.div`
  grid-area: b;
  background-color: gray;
  box-sizing: border-box;
`;

const NaverShopImage3 = styled.div`
  grid-area: c;
  background-color: gray;
  box-sizing: border-box;
`;

const NaverShopData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  box-sizing: border-box;
  font-size: 12px;
`;

const NaverShopDataText = styled.div`
  background-color: white;
  color: black;
  box-sizing: border-box;
`;

const NaverShopDataType = styled.div`
  font-size: 12px;
  box-sizing: border-box;
`;

const NaverShopDataTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
`;

const NaverShopText = styled.div`
  grid-area: g;
  display: flex; 
  flex-direction: column; 
  margin-top: 50px;
  gap: 12px;
`;

const HomeTitle = styled.div`
  font-size: 3rem;
  color: black;
  font-weight: bold;
`;

const HomeContent = styled.div`
  font-size: 1.3rem;
`;