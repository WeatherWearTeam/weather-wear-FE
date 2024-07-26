import React from 'react';
import styled from 'styled-components';

type ButtonType = 'primary' | 'secondary';

interface ButtonProps {
    $buttonType?: ButtonType;
    $selected?: boolean;
}

const OOTDTrend: React.FC = () => {
    return (
        <HomeContents4>
            <TrendGrid>
                <TrendImage1></TrendImage1>
                <TrendText>
                    <HomeTitle>OOTD Trend 추천</HomeTitle>
                    <HomeContent>
                        오늘 다른 사람들은 어떻게 입었을 까요?<br />
                        오늘의 인기있는 OOTD 트랜드를 확인해보세요!
                    </HomeContent>
                    <TrendMore>MORE</TrendMore>
                </TrendText>
                <TrendImage2></TrendImage2>
                <TrendImage3></TrendImage3>
                <TrendImage4></TrendImage4>
            </TrendGrid>
        </HomeContents4>
    );
};

export default OOTDTrend;

const HomeTitle = styled.div`
  font-size: 3rem;
  color: black;
  font-weight: bold;
`;

const HomeContent = styled.div`
  font-size: 1.3rem;
`;

const HomeContents4 = styled.div`
  width: 80%;
  height: 500px;
  flex-direction: column;
  position: static;
  margin: 40px 0;
`;

const TrendGrid = styled.div`
  justify-content: center; 
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(5, 200px);
  grid-gap: 20px;
  grid-template-rows: 200px 250px;
  grid-template-areas: 
      'a a b b b '
      'a a c d e '
`;

const TrendImage1 = styled.div`
  grid-area: a;
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;

const TrendText = styled.div`
  grid-area: b;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
  text-align: center; /* 텍스트 중앙 정렬 */
  gap: 12px;
`;

const TrendMore = styled.button<ButtonProps>`
  background-color: ${({ theme, $buttonType = 'primary' }) =>
        theme.buttons[$buttonType].backgroundColor};
  border: ${({ theme, $buttonType = 'primary' }) =>
        theme.buttons[$buttonType].border || 'inherit'};
  color: ${({ theme, $buttonType = 'primary' }) =>
        theme.buttons[$buttonType].color || 'inherit'};
  width: 100px;
  height: 38px;
  cursor: pointer;
  border-radius: 30px;
  transition: background-color 0.2s, border-color 0.2s;
  outline: none;

  &:hover {
    background-color: ${({ theme, $buttonType = 'primary' }) =>
        $buttonType === 'secondary' ? theme.colors.black : theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
  }
  
  &:focus {
    background-color: ${({ theme, $buttonType = 'primary' }) =>
        $buttonType === 'secondary' ? theme.colors.black : theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const TrendImage2 = styled.div`
  grid-area: c;
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;
const TrendImage3 = styled.div`
  grid-area: d;
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;
const TrendImage4 = styled.div`
  grid-area: e;
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;