import React, { useState } from 'react';
import styled from 'styled-components';
import MyOOTDRecommendation from '@components/MyOOTDRecommendation';
import OOTDTrend from '@components/OOTDTrend';
import NaverShopRecommendation from '@components/NaverShopRecommendation';
import ColorBar from '@components/ColorBar';
import ClothesTag from '@components/ClothesTag';
import ClothesType from '@components/ClothesTypes';
import ColorChip from '@components/ColorChip';
import Icon from '@components/Icon';
import { menuIcon, heartIcon, heartFillIcon } from '@shared/icons';

const Home: React.FC = () => {
  const [liked, setLiked] = useState<boolean[]>([false, false, false]);

  const toggleLike = (index: number) => {
    setLiked((prev) => {
      const newLiked = [...prev];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  return (
    <HomeContainer>
      Home
      <ColorBar />
      <ClothesTag color="red" type="티셔츠" />
      <ColorChip color={'red'} />
      <Icon icon={menuIcon} />
      <Icon icon={heartIcon} />
      <Icon icon={heartFillIcon} />
      <ClothesType />

      <Divider />
      <MyOOTDRecommendation />

      <Divider />
      <OOTDTrend />

      <Divider />
      <NaverShopRecommendation liked={liked} toggleLike={toggleLike} />

      <Divider />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Divider = styled.hr`
  width: 80%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  margin: 20px 0;
`;