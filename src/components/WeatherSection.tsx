import styled, { css } from "styled-components";
import WeatherIconDisplay from "@components/WeatherBackground/WeatherIconDisplay";
import getWeatherRecommendation from "@shared/getWeatherAnnouncement";
import { WeatherData } from "@api/weatherApi";
import { AddressInfo } from "@components/Weather/MapSelector";
import { getPtyState, getSkyState } from "@utils/getWeather";
import getFeelsLikeTemperature from "@utils/getFeelsLikeTemperature";
import WeatherDisplay from "@components/WeatherBackground/WeatherDisplay";
// vite-plugin-svgr (4.0.0 이상 버전)에서는 사용 방법이 살짝 다르다.
// SVG 파일을 가져올 때, ?react라는 접미사를 붙여 앨리어싱을 건너뛰어 기본 내보내기를 사용할 수 있다.
// 이렇게 사용할 경우 svg.d.ts 파일을 생성해야 한다.

interface WeatherSectionProps {
  weatherData?: WeatherData;
  addressInfo?: AddressInfo;
}
export default function WeatherSection({
  weatherData,
  addressInfo,
}: WeatherSectionProps) {
  //////////////////////////////////////////////////////////////////////////////
  return (
    <Container>
      <GridContainer>
        <WeatherDisplay
          pty={weatherData?.pty as number}
          sky={weatherData?.sky as number}
          tmp={weatherData?.tmp as number}
          wsd={weatherData?.wsd as number}
        />
        <Column>
          <RightColum>
            {/* 날씨 정보를 사용하는 부분 */}
            <WeatherWrapper>
              <WeatherIconDisplay
                pty={weatherData?.pty as number}
                sky={weatherData?.sky as number}
                tmp={weatherData?.tmp as number}
                wsd={weatherData?.wsd as number}
              />
              <WeatherInfo>
                <WeatherTemperature>{weatherData?.tmp}°C</WeatherTemperature>
                <ContentDescription>
                  <WeatherInfoMainWrapper>
                    <WeatherInfoMainText>
                      {getSkyState(weatherData?.sky as number)}
                    </WeatherInfoMainText>
                    <WeatherInfoMainText>
                      | {getPtyState(weatherData?.pty as number)}
                    </WeatherInfoMainText>
                  </WeatherInfoMainWrapper>
                  <WeatherInfoSubWrapper>
                    <WeatherInfoSubTitle>체감</WeatherInfoSubTitle>
                    <WeatherInfoSubText>
                      {getFeelsLikeTemperature(
                        weatherData?.tmp as number,
                        weatherData?.reh as number,
                        weatherData?.wsd as number
                      )}
                    </WeatherInfoSubText>
                    <WeatherInfoSubTitle>습도</WeatherInfoSubTitle>
                    <WeatherInfoSubText>{weatherData?.reh}%</WeatherInfoSubText>
                    <WeatherInfoSubTitle>강수확률</WeatherInfoSubTitle>
                    <WeatherInfoSubText>{weatherData?.pop}%</WeatherInfoSubText>
                  </WeatherInfoSubWrapper>
                </ContentDescription>
              </WeatherInfo>
            </WeatherWrapper>
          </RightColum>
        </Column>
        <Column>
          <ContentContainer>
            <ContentTitle>현재 {addressInfo?.address}의 날씨는</ContentTitle>
            <WeatherAnnouncement>
              {getWeatherRecommendation(weatherData as WeatherData)}
            </WeatherAnnouncement>
            <ContentDescription>
              오늘 같은 날씨에 입기 좋은 옷차림을 추천해 드릴게요!
            </ContentDescription>
            <RecommendedContainer>
              <RecommendedItem>바람막이</RecommendedItem>
              <RecommendedItem>우산</RecommendedItem>
              <RecommendedItem>장화</RecommendedItem>
            </RecommendedContainer>
          </ContentContainer>
        </Column>
      </GridContainer>
    </Container>
  );
}

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

const ContentTitle = styled.h2`
  font-size: xx-large;
  color: black;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: x-large;
  }
`;

const WeatherAnnouncement = styled.div`
  color: black;
  font-size: large;
  white-space: pre-wrap;
`;

const ContentDescription = styled.div`
  color: black;
  font-size: large;
`;

const WeatherTemperature = styled.h3`
  font-size: 5rem;
  color: black;
  font-weight: bold;
`;

const WeatherInfoMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  width: 25rem;
`;

const WeatherInfoMainText = styled.h3`
  font-size: x-large;
`;

const WeatherInfoSubWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  width: 25rem;
`;

const WeatherInfoSubTitle = styled.div`
  font-size: small;
  font-weight: bolder;
`;
const WeatherInfoSubText = styled.div`
  font-size: small;
  font-weight: lighter;
`;

const RecommendedContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;

const RecommendedItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: medium;
  width: 13rem;
  height: 13rem;
  border: 1px solid
    ${({ theme }) => css`
      ${theme.colors.WHITE}80; //투명도 30% 4d, 20% 26
    `};
  border-radius: 10rem;
  background-color: ${({ theme }) => css`
    ${theme.colors.WHITE}26; //투명도 30% 4d, 20% 26
  `};
  box-shadow: 1px 5px 20px 1px rgba(198, 198, 198, 0.2);

  @media (max-width: 600px) {
    font-size: small;
    width: 10rem;
    height: 10rem;
  }
`;

//✅ 페이지 아웃라인
const Container = styled.div`
  /* height: calc(100vh - 7rem); */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* padding: 2rem 4rem 4rem 4rem; */
  /* padding: 2rem; */
  /* background-color: red; */
`;

// const colorChange = keyframes`
//   0% {
//     background: rgba(205, 232, 255, 1)
//   }
//   100% {
//     background:rgba(110, 140, 159, 0.5)
//   }
//   `;

const GridContainer = styled.div`
  position: relative;
  background: rgb(205, 232, 255);
  background: linear-gradient(0deg, #ffff 0%, #cde8ff 15%, #6e8c9f 100%);
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 4fr;
  gap: 3rem;
  padding-top: 5rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0rem;
  }
`;

const Column = styled.div`
  position: relative;
  z-index: 1; /* Rainy 컴포넌트보다 위에 표시되도록 설정 */
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem;

  @media (max-width: 900px) {
    padding: 0 2rem 2rem 2rem;
  }
  @media (max-width: 600px) {
    padding: 0 1rem 1rem 1rem;
  }
`;

const RightColum = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem; //패애애애애딩
  min-height: 35rem; //✅
`;

const WeatherWrapper = styled.div`
  /* border: 1px solid black; */
  position: relative;
`;

const WeatherInfo = styled.div`
  /* border: 1px solid red; */ //🌟
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 20%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem; //패애애애애딩
`;
