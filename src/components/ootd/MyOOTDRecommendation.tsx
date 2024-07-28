import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyOOTDGrid from '@components/ootd/MyOOTDGrid';

type ButtonType = 'primary' | 'secondary';

interface ButtonProps {
  $buttonType?: ButtonType;
  $selected?: boolean;
}

const MyOOTDRecommendation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ContentContainer>
      <ContentTitle>My OOTD 추천</ContentTitle>
      <DescriptionButtonContainer>
        <ContentDescription>
          오늘 날씨에는 내 옷장의 이런 옷들을 추천합니다!<br />
          더 다양한 스타일 추천을 원한다면 옷을 추가해주세요!
        </ContentDescription>
        <StyledButton onClick={() => navigate('/mypage/closet')}>내 옷장 바로가기</StyledButton>
      </DescriptionButtonContainer>
      <MyOOTDGrid />
    </ContentContainer>
  );
};

export default MyOOTDRecommendation;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContentTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: left;
  color: black;
  font-weight: bold;
`;

const DescriptionButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContentDescription = styled.p`
  font-size: 1.2rem;
  text-align: left;
`;

const StyledButton = styled.button<ButtonProps>`
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
