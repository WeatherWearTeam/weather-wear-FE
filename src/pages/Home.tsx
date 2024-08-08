import React, { useState } from "react";
import styled from "styled-components";
import MyOOTDRecommendation from "@components/ootd/MyOOTDRecommendation";
import OOTDTrend from "@components/trend/OOTDTrend";
import NaverShopRecommendation from "@components/shop/NaverShopRecommendation";
import WeatherSection from "@components/WeatherSection";
import SignupRecommendation from "@components/SignupRecommendation";
import useAuth from "@queries/useAuth";
import { useHomeRecommandsItems } from "@queries/wishlistQueries";
import { useHomeWeatherDatas } from "@queries/weatherQueries";

const Home: React.FC = () => {
  const [liked, setLiked] = useState<boolean[]>([false, false, false]);

  const toggleLike = (index: number) => {
    setLiked((prev) => {
      const newLiked = [...prev];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  const { isLoggedIn } = useAuth();

  const { homeRecommandsData, isPending, isError, isSuccess } =
    useHomeRecommandsItems(1);

  const [addressId, setAddressId] = useState();

  const getAddressCode = (code) => {
    setAddressId(code);
  };
  console.log("addressId", Number(addressId));

  const { homeWeatherDatas, weatherPending, weatherError, weatherSuccess } =
    useHomeWeatherDatas(Number(addressId));

  return (
    <HomeContainer>
      <WeatherSection onGetAddressCode={getAddressCode} />

      {!isLoggedIn ? (
        <>
          <SignupRecommendation />
        </>
      ) : (
        <>
          <Divider />
          <MyOOTDRecommendation />

          <Divider />
          <OOTDTrend />

          <Divider />
          {isSuccess && (
            <NaverShopRecommendation
              liked={liked}
              toggleLike={toggleLike}
              data={homeRecommandsData[1]}
            />
          )}

          <Divider />
        </>
      )}
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
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box; /* 패딩을 포함한 박스 크기 조정 */
`;

const Divider = styled.hr`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.borderLightGray};
  margin: 20px 0;
`;
