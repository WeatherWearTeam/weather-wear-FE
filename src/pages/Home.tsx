import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import MyOOTDRecommendation from "@components/Home/Ootd/MyOOTDRecommendation";
import OOTDTrend from "@components/Trend/OOTDTrend";
import NaverShopRecommendation from "@components/Home/NaverShop/NaverShopRecommendation";
import SignupRecommendation from "@components/Home/SignupRecommendation";
import useAuth from "@queries/useAuth";
import { useHomeRecommendsItems } from "@queries/wishlistQueries";
import { useWeatherData } from "@queries/weatherQueries";
import MapSelector, { AddressInfo } from "@components/Weather/MapSelector";
import useModal from "@hooks/useModal";
import { useMe } from "@queries/userQueries";
import WeatherRecommendation from "@components/Home/Weather/WeatherRecommendation";
import MyClosetRecommendation from "@components/Home/MyClosetRecommendation";

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
  const { me: myUserData } = useMe(isLoggedIn);

  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [weatherId, setWeatherId] = useState<number | null>(null);

  const getAddressCode = useCallback((info: AddressInfo) => {
    setAddressInfo(info);
  }, []); //컴포넌트가 마운트될 때만 함수를 생성

  ////////////////////////////////////////////////////////
  const { weatherData, isPendingWeather, isErrorWeather, isSuccessWeather } =
    useWeatherData(Number(addressInfo?.code));

  console.log("===weatherId===", weatherId);
  const { homeRecommendsData, isPending, isError, isSuccess } =
    useHomeRecommendsItems(weatherId as number);

  console.log(homeRecommendsData);
  //웨더 api 받아온 후 받아야 하므로 ✅직렬처리로 순서대로 api 요청 필요!
  useEffect(() => {
    if (isSuccessWeather && weatherData?.id) {
      setWeatherId(weatherData.id);
    }
  }, [isSuccessWeather, weatherData]);

  const { openModal, closeModal, isVisible } = useModal();

  return (
    <HomeContainer>
      {/* 정보를 얻는 지도 */}

      <WeatherInfoWrapper>
        <MapSelectorWrapper>
          <MapSelector
            onClick={() => openModal()}
            closeModal={closeModal}
            isVisible={isVisible}
            onGetAddressCode={getAddressCode}
          />
        </MapSelectorWrapper>
      </WeatherInfoWrapper>
      <WeatherRecommendation
        weatherData={weatherData}
        addressInfo={addressInfo!}
        gender={myUserData?.gender}
        isLoggedIn={isLoggedIn}
      />

      {!isLoggedIn && (
        <>
          <SignupRecommendation />
          <Divider />
          {isSuccess && <OOTDTrend data={homeRecommendsData[0]} />}
        </>
      )}

      {isLoggedIn && (
        <>
          <Divider />

          {isSuccess && homeRecommendsData[0] && (
            <>
              <MyClosetRecommendation data={homeRecommendsData[0]} />
              <Divider />
            </>
          )}
          {isSuccess && homeRecommendsData[1] && (
            <>
              <MyOOTDRecommendation data={homeRecommendsData[1]} />
              <Divider />
            </>
          )}

          {isSuccess && (
            <>
              <OOTDTrend data={homeRecommendsData[2]} />
              <Divider />
            </>
          )}

          {isSuccess && (
            <>
              <NaverShopRecommendation
                liked={liked}
                toggleLike={toggleLike}
                data={homeRecommendsData[3]}
              />
              <Divider />
            </>
          )}
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

const WeatherInfoWrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 3fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MapSelectorWrapper = styled.div`
  position: absolute;
  z-index: 3;
  grid-column: 1;
  top: 3rem;
  justify-self: center;
  align-self: center;

  @media (min-width: 900px) {
    justify-self: left;
    left: 7rem;
  }
`;

const Divider = styled.hr`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.borderLightGray};
  margin: 20px 0;
`;
