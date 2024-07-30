import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MyOOTDRecommendation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ContentContainer>
      <OOTDGrid>
        <OOTDHeader>
          <HeaderLeft>
            <ContentTitle>My OOTD 추천</ContentTitle>
            <HeaderContentContainer>
              <ContentDescription>
                오늘 날씨에는 내 옷장의 이런 옷들을 추천합니다!<br />
                더 다양한 스타일 추천을 원한다면 옷을 추가해주세요!
              </ContentDescription>
              <StyledButton onClick={() => navigate('/mypage/closet')}>내 옷장 바로가기</StyledButton>
            </HeaderContentContainer>
          </HeaderLeft>
        </OOTDHeader>
        <MyOOTDImage1 />
        <MyOOTDImage2 />
        <MyOOTDImage3 />
        <MyOOTDImage4 />
      </OOTDGrid>
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
  align-items: center;
`;

const OOTDGrid = styled.div`
  width: 100%;
  justify-content: center; 
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px 250px;
  grid-gap: 5px 50px;
  grid-template-areas: 
      'header header header header'
      'img1 img2 img3 img4';

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: 200px 250px;
    grid-template-areas: 
      'header header header'
      'img1 img2 img3';
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 200px);
    grid-template-rows: 200px 250px;
    grid-template-areas: 
      'header header'
      'img1 img2';
  }

  @media (max-width: 768px) {
    grid-template-columns: 300px;
    grid-template-rows: 250px 250px 250px 250px;
    grid-template-areas: 
      'header'
      'img1'
      'img2'
      'img3'
      'img4';
  }
`;

const OOTDHeader = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderLeft = styled.div`
  text-align: left;
  width: 100%;
`;

const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MyOOTDImage = styled.div`
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;

const MyOOTDImage1 = styled(MyOOTDImage)`
  grid-area: img1;
`;

const MyOOTDImage2 = styled(MyOOTDImage)`
  grid-area: img2;
`;

const MyOOTDImage3 = styled(MyOOTDImage)`
  grid-area: img3;
`;

const MyOOTDImage4 = styled(MyOOTDImage)`
  grid-area: img4;
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

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.buttons.secondary.backgroundColor};
  border: ${({ theme }) => theme.buttons.secondary.border || 'inherit'};
  color: ${({ theme }) => theme.buttons.secondary.color || 'inherit'};
  width: 150px;
  height: 35px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;
