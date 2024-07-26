import React from 'react';
import styled from 'styled-components';
import MyOOTDGrid from '@components/MyOOTDGrid';

type ButtonType = 'primary' | 'secondary';

interface ButtonProps {
    $buttonType?: ButtonType;
    $selected?: boolean;
}

const MyOOTDRecommendation: React.FC = () => {
    return (
        <HomeContents3>
            <HomeTitle>My OOTD 추천</HomeTitle>
            <HomeContentContainer>
                <HomeContent>
                    오늘 날씨에는 내 옷장의 이런 옷들을 추천합니다!<br />
                    더 다양한 스타일 추천을 원한다면 옷을 추가해주세요!
                </HomeContent>
                <MyCloset>내 옷장 바로가기</MyCloset>
            </HomeContentContainer>
            <MyOOTDGrid />
        </HomeContents3>
    );
};

export default MyOOTDRecommendation;

// 마이OOTD추천 부분
const HomeContents3 = styled.div`
  width: 60%;
  height: 400px;
  flex-direction: column;
  position: static;
  margin: 40px 0;
`;

const HomeTitle = styled.div`
  font-size: 3rem;
  color: black;
  font-weight: bold;
`;

const HomeContentContainer = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomeContent = styled.div`
  font-size: 1.3rem;
`;

// 내옷장 바로가기 버튼
const MyCloset = styled.button<ButtonProps>`
  background-color: ${({ theme, $buttonType = 'secondary' }) =>
        theme.buttons[$buttonType].backgroundColor};
  border: ${({ theme, $buttonType = 'secondary' }) =>
        theme.buttons[$buttonType].border || 'inherit'};
  color: ${({ theme, $buttonType = 'secondary' }) =>
        theme.buttons[$buttonType].color || 'inherit'};
  width: 150px;
  height: 35px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  outline: none;

  &:hover {
    background-color: ${({ theme, $buttonType = 'secondary' }) =>
        $buttonType === 'secondary' ? theme.colors.black : theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme, $buttonType = 'secondary' }) =>
        $buttonType === 'secondary' ? theme.colors.white : theme.colors.black};
  }

  &:focus {
    background-color: ${({ theme, $buttonType = 'secondary' }) =>
        $buttonType === 'secondary' ? theme.colors.black : theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme, $buttonType = 'secondary' }) =>
        $buttonType === 'secondary' ? theme.colors.white : theme.colors.black};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;