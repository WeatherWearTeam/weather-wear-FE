import styled, { css } from "styled-components";
import MapContainer from "@components/Modal/MapContainer";
import ModalLayout from "@components/Modal/ModalLayout";
import ModalPortal from "@components/Modal/ModalPortal";
import Icon from "@components/Icon";
import { focusIcon, navigationFillIcon } from "@shared/icons";
import { useEffect, useState } from "react";
import useGeolocation from "@hooks/useGeolocation";
import axios from "axios";

export interface AddressInfo {
  address: string;
  code: string;
}
interface MapSelectorProps {
  onClick: () => void;
  closeModal: () => void;
  isVisible: boolean;
  onGetAddressCode: (info: AddressInfo) => void;
}

const MapSelector = ({
  onClick,
  closeModal,
  isVisible,
  onGetAddressCode,
}: MapSelectorProps) => {
  const { geolocation } = useGeolocation(); //geolocation으로 내 위치의 위도경도 구하기

  //사용자 위도경도로 자동으로 가져오는 주소, 법정동 코드
  const [currentAddressAndCode, setCurrentAddressAndCode] =
    useState<AddressInfo | null>(null);
  //✅ 현재 위치 정보 전역으로 저장 필요 ㅇㅇㅇ!! 또는 로컬 스토리지에도 저장할 수도!?

  //사용자가 지도에서 선택한 주소, 법정동 코드
  const [currLocation, setCurrLocation] = useState<AddressInfo | null>(null);

  /////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (geolocation) {
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
          setCurrentAddressAndCode(newAddressAndCode);
        } catch (error) {
          console.error("❌ 주소와 코드를 가져오지 못했어요!", error);
        }
      };

      getAddressAndCode(geolocation.lon, geolocation.lat);
    } else {
      return console.log("위치 정보를 가져올 수 없어요.");
    }
  }, [geolocation]);

  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    //밖으로 가져가기
    if (!currLocation && currentAddressAndCode) {
      console.log(
        "📍사용자 🌏위경도 값으로 자동으로 받기",
        currentAddressAndCode
      );
      onGetAddressCode(currentAddressAndCode!);
    } else if (currLocation) {
      console.log("📍사용자가 🗺️지도에서 선택한 값 받기", currLocation);
      onGetAddressCode(currLocation!);
    }
  }, [currentAddressAndCode, currLocation, onGetAddressCode]);

  /**
   * 사용자가 지도 맵에서 위치 선택하면 주소, 법정동 코드 가져오는 함수
   */
  const getCurrLocation = (currLocation: AddressInfo) => {
    setCurrLocation(currLocation);
  };

  return (
    <>
      <GeolocationSelect onClick={onClick}>
        <Icon icon={focusIcon} />
        {!currLocation ? currentAddressAndCode?.address : currLocation?.address}
        <Icon icon={navigationFillIcon} />
      </GeolocationSelect>

      {/* 지도 모달 띄우는 부분*/}
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
    </>
  );
};

export default MapSelector;

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
