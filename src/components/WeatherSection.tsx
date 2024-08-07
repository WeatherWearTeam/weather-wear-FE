const weatherCommentList = [
  {
    sunny: [
      //맑은 날씨
      "오늘은 대체로 맑겠습니다.",
      "맑은 하늘 아래 야외 활동하기 좋은 날씨입니다.",
      "오늘 하루 쾌청한 날씨가 이어질 예정입니다.",
    ],
  },
  {
    cloudy: [
      //흐린 날씨
      "오늘은 구름이 많이 끼는 흐린 날씨가 예상됩니다.",
      "흐린 날씨로 인해 일교차가 클 수 있으니 건강 관리에 유의하시기 바랍니다.",
      "구름이 많아 햇볕을 보기 어려운 하루가 될 것입니다.",
    ],
  },
  {
    rainy: [
      //비 오는 날씨
      "오늘은 비 소식이 있습니다.",
      "우산을 챙기셔야 할 날씨입니다.",
      "비가 내리는 지역에서는 교통 안전에 주의하시기 바랍니다.",
    ],
  },
  {
    snowy: [
      //눈 오는 날씨
      "오늘은 곳곳에 눈이 내리겠습니다.",
      "눈길 운전 시 안전에 각별히 신경 쓰시기 바랍니다.",
      "하얀 눈이 쌓인 풍경을 즐기기 좋은 날입니다.",
    ],
  },
  {
    thunderstorm: [
      //천둥 번개가 치는 날씨
      "오늘은 천둥과 번개를 동반한 강한 비가 예상됩니다.",
      "번개와 함께 강한 비가 내릴 것으로 보이니 외출 시 주의하시기 바랍니다.",
      "천둥번개가 치는 날씨로 인해 야외 활동 시 위험할 수 있으니 가능한 실내에서 안전하게 지내세요.",
    ],
  },
  {
    hot: [
      //더운 날씨
      "오늘은 기온이 크게 올라 무더운 날씨가 예상됩니다.",
      "폭염 경보가 발효 중이니 야외 활동을 자제하시고 충분한 수분 섭취가 필요합니다.",
      "한낮 더위가 심할 것으로 보이니 건강 관리에 유의하시기 바랍니다.",
    ],
  },
  {
    cold: [
      //추운 날씨
      "오늘은 기온이 크게 떨어져 추운 날씨가 이어지겠습니다.",
      "매서운 한파가 예상되니 외출 시 보온에 신경 써야겠습니다.",
      "춥고 건조한 날씨가 계속되니 건강 관리에 유의하시기 바랍니다.",
    ],
  },
  {
    wet: [
      //습한 날씨
      "오늘은 습도가 높아 불쾌지수가 높아질 것으로 예상됩니다.",
      "습한 날씨로 인해 불편함을 느낄 수 있으니 실내 환기에 신경 쓰시기 바랍니다.",
      "후덥지근한 날씨가 이어지니 건강 관리에 주의하시기 바랍니다.",
    ],
  },
  {
    dry: [
      //건조한 날씨
      "오늘은 건조한 날씨가 예상되니 화재 예방에 각별히 유의하시기 바랍니다.",
      "건조한 공기 때문에 피부 건조나 호흡기 질환에 주의해야겠습니다.",
      "대기가 건조하니 실내 습도 조절에 신경 쓰시기 바랍니다.",
    ],
  },
  {
    windy: [
      //바람이 강한 날씨
      "오늘은 강한 바람이 불 것으로 예상됩니다.",
      "바람이 강해 체감 온도가 낮아질 수 있으니 따뜻한 옷차림을 권장합니다.",
      "강풍으로 인해 시설물 피해가 우려되니 주의하시기 바랍니다.",
    ],
  },
];

import MapContainer from "@components/Modal/MapContainer";
import ModalLayout from "@components/Modal/ModalLayout";
import ModalPortal from "@components/Modal/ModalPortal";
import useModal from "@hooks/useModal";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import CloudyIcon from "@assets/icons/cloudy.svg?react";
import RainySunCloudyIcon from "@assets/icons/rainy_sun_cloudy.svg?react";
import RainyIcon from "@assets/icons/rainy.svg?react";
import SnowyIcon from "@assets/icons/snowy.svg?react";
import SunCloudyIcon from "@assets/icons/sun_cloudy.svg?react";
import SunCloudy2Icon from "@assets/icons/sun_cloudy2.svg?react";
import SunnyIcon from "@assets/icons/sunny.svg?react";
import ThunderIcon from "@assets/icons/thunder.svg?react";
import ThunderstormIcon from "@assets/icons/thunderstorm.svg?react";
import VeryCloudyIcon from "@assets/icons/very_cloudy.svg?react";
import WindyIcon from "@assets/icons/windy.svg?react";

import Icon from "@components/Icon";
import { focusIcon, navigationFillIcon } from "@shared/icons";
import { useEffect, useState } from "react";
import useGeolocation from "@hooks/useGeolocation";
import axios from "axios";
import Rainy from "@components/WeatherBackground/Rainy";
import Snowy from "@components/WeatherBackground/Snowy";
import Thunderstorm from "@components/WeatherBackground/Thunderstorm";
import Windy from "@components/WeatherBackground/Windy";
import Cloudy from "@components/WeatherBackground/Cloudy";
import Sunny from "@components/WeatherBackground/Sunny";
import Hot from "@components/WeatherBackground/Hot";
// vite-plugin-svgr (4.0.0 이상 버전)에서는 사용 방법이 살짝 다르다.
// SVG 파일을 가져올 때, ?react라는 접미사를 붙여 앨리어싱을 건너뛰어 기본 내보내기를 사용할 수 있다.
// 이렇게 사용할 경우 svg.d.ts 파일을 생성해야 한다.

export default function WeatherSection() {
  const navigate = useNavigate();

  const { isVisible, openModal, closeModal } = useModal();

  const { geolocation } = useGeolocation(); //geolocation으로 내 위치의 위도경도 구하기

  //✅ 현재 위치 정보 전역으로 저장 필요 ㅇㅇㅇ!! 또는 로컬 스토리지에도 저장할 수도!?
  const [currentAddressAndCode, setCurrentAddressAndCode] = useState<{
    address: string;
    code: string;
  } | null>(null);

  useEffect(() => {
    if (!geolocation) {
      return console.log("위치 정보를 가져올 수 없어요. ~~설정해주세요!");
    }

    const getAddressAndCode = async (lon: string, lat: string) => {
      try {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json`,
          {
            headers: {
              Authorization: `KakaoAK ${
                import.meta.env.VITE_KAKAO_REST_API_KEY
              }`, // 환경 변수에서 API 키를 가져옵니다.
            },
            params: {
              x: lon,
              y: lat,
            },
          }
        );

        const result = response.data.documents[0];
        const newAddressAndCode = {
          address: result.address_name,
          code: result.code,
        };

        console.log("✅ axios 주소/코드 값 얻음");
        return setCurrentAddressAndCode(newAddressAndCode);
      } catch (error) {
        console.error("주소와 코드를 가져오지 못했어요!", error);
        return null;
      }
    };

    getAddressAndCode(geolocation.lon, geolocation.lat);
  }, [geolocation]);

  const [currLocation, setCurrLocation] = useState<{
    address: string;
    code: string;
  } | null>(null);

  const getCurrLocation = (currLocation) => {
    setCurrLocation(currLocation);
  };
  return (
    <Container>
      <GridContainer>
        {/* <Rainy /> */}
        {/* <Snowy /> */}
        <Thunderstorm />
        {/* <Windy /> */}
        {/* <Cloudy /> */}
        {/* <Sunny /> */}
        {/* <Hot /> */}
        <Column>
          <RightColum>
            <GeolocationSelect onClick={() => openModal()}>
              <Icon icon={focusIcon} />
              {!currLocation
                ? currentAddressAndCode?.address
                : currLocation?.address}
              <Icon icon={navigationFillIcon} />
            </GeolocationSelect>

            {/* <SunnyIcon width={"25rem"} height={"25rem"} />
          <SunCloudyIcon width={"26rem"} height={"26rem"} />
          <SunCloudy2Icon width={"26rem"} height={"26rem"} />
          <VeryCloudyIcon width={"20rem"} height={"20rem"} />
          <WindyIcon width={"26rem"} height={"26rem"} />
          <RainySunCloudyIcon width={"26rem"} height={"26rem"} />
          <RainyIcon width={"26rem"} height={"26rem"} />
          <SnowyIcon width={"26rem"} height={"26rem"} />
          <ThunderIcon width={"20rem"} height={"20rem"} /> */}
            <WeatherWrapper>
              <ThunderstormIcon width={"26rem"} height={"26rem"} />

              <WeatherInfo>
                <ContentTitle>{"24"}°C</ContentTitle>
                <ContentDescription>{"천둥번개"}</ContentDescription>
              </WeatherInfo>
            </WeatherWrapper>

            {isVisible && (
              <ModalPortal>
                <ModalLayout onClose={closeModal}>
                  <MapContainer
                    onClose={closeModal}
                    onGetCurrLocation={getCurrLocation}
                  />
                </ModalLayout>
              </ModalPortal>
            )}
          </RightColum>
        </Column>
        <Column>
          <ContentContainer>
            <ContentTitle>
              오늘{" "}
              {!currLocation
                ? currentAddressAndCode?.address
                : currLocation?.address}
              의 날씨
              <br />
              기온은 {"24"}도
              <br />
              {"천둥 번개를 동반한 비"}가 내립니다.
            </ContentTitle>
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

const ContentDescription = styled.p`
  color: black;
  font-size: medium;
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

const GeolocationSelect = styled.div`
  background-color: ${({ theme }) => css`
    ${theme.colors.WHITE}4d; //투명도 30%
  `};
  border: 1px solid
    ${({ theme }) => css`
      ${theme.colors.WHITE}99; //투명도 60%
    `};
  padding: 1rem;
  font-size: medium;
  color: ${({ theme }) => theme.colors.BLACK};

  border-radius: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.25s linear;
  cursor: pointer;
  &:hover,
  &:focus {
    ${({ theme }) => css`
      background-color: ${theme.colors.WHITE}26; //투명도 20%  33//15% 26
    `};
  }
`;
