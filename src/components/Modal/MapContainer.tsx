import Button from "@components/Button";
import Icon from "@components/Icon";
import Input from "@components/Input";
import useGeolocation from "@hooks/useGeolocation";
import { focusIcon } from "@shared/icons";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapContainerProps {
  onClose: () => void;
  onGetCurrLocation: () => void;
}

export default function MapContainer({
  onClose,
  onGetCurrLocation,
}: MapContainerProps) {
  //   //index.html에서 스크립트로 map api 작성해 두면
  //   //window 전역 객체에 들어가게 되므로 window.kakao 객체를 구조분해할당으로 가져온다.
  const { kakao } = window;

  const { geolocation } = useGeolocation(); //geolocation으로 내 위치의 위도경도 구하기

  const mapRef = useRef<HTMLDivElement>(null);

  //마커와 인포윈도우 새로운 마커 찍히면 없애기 위해 useRef로 가져옴
  const currentMarkerRef = useRef<any>(null);
  const currentInfoWindowRef = useRef<any>(null);

  const [keyword, setKeyword] = useState("");

  const [addressList, setAddressList] = useState([]);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: string;
    lon: string;
  } | null>(null);

  const [currentAddressAndCode, setCurrentAddressAndCode] = useState<{
    address: string;
    code: string;
  } | null>(null);

  //----------------------------------------------------------------------------

  //검색 form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getAddressFromSearch(keyword);
    setKeyword("");
  };

  const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const handleGetMyLocation = () => {
    try {
      const lat = geolocation?.lat;
      const lon = geolocation?.lon;
      setCurrentLocation({ lat: `${lat}`, lon: `${lon}` });

      setAddressList([]);
      console.log("handleGetMyLocation", "geolocation 값 setCurrentLocation");
    } catch {
      console.log("위치 정보를 가져오지 못했습니다.");
    }
  };

  const handleMyLocationCheck = () => {
    console.log("서버로 현재 위치/코드 정보 보내기: ", currentAddressAndCode);
    onGetCurrLocation(currentAddressAndCode);
    //모달 창 닫기
    onClose();
  };
  //----------------------------------------------------------------------------

  // 🌈  지도에 마커와 인포윈도우를 표시하는 함수
  const displayMarker = useCallback((map, locPosition, message) => {
    //현재 마커가 찍혀 있으면 그 값 삭제하기
    if (currentMarkerRef.current) {
      currentMarkerRef.current.setMap(null);
    }
    //현재 인포 윈도우 열려 있으면 그 윈도우 닫기
    if (currentInfoWindowRef.current) {
      currentInfoWindowRef.current.close();
    }

    // 마커 생성
    const marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    // 인포윈도우 생성
    const infowindow = new kakao.maps.InfoWindow({
      content: message,
    });

    // 인포윈도우를 마커위에 표시
    infowindow.open(map, marker);
    // 지도 중심좌표를 접속위치로 변경
    map.setCenter(locPosition);

    // 마커 위치 상태 업데이트
    currentMarkerRef.current = marker;
    // 인포 윈도우도 업데이트
    currentInfoWindowRef.current = infowindow;
  }, []);

  //----------------------------------------------------------------------------

  // 🌈🌈 2. 지도 클릭 시 마커/인포 띄우고 주소, 코드 정보 얻기
  const getRegionCodeMapClick = useCallback((map) => {
    kakao.maps.event.addListener(
      map,
      "click",
      async (mouseEvent: kakao.maps.event.MouseEvent) => {
        const latLng = mouseEvent.latLng;
        const lat = latLng.getLat();
        const lon = latLng.getLng();

        //------------------------------
        getAddressAndCode(`${lon}`, `${lat}`);
        //------------------------------

        const message =
          '<div style="padding:1.5rem; font-size:small">여기에 계신가요? 👀</div>';
        displayMarker(map, latLng, message);
      }
    );
  }, []);
  //----------------------------------------------------------------------------

  // ✅ 카카오 로컬 REST API로 위도 경도 보내서 주소, 법정/행정 코드 얻기
  const getAddressFromSearch = useCallback(async (keyword: string) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`, // 환경 변수에서 API 키를 가져옵니다.
          },
          params: {
            query: keyword, // 검색 값
          },
        }
      );

      const addressList = response.data.documents;

      //예외 처리
      if (addressList[0].address_type === "ROAD") {
        return console.log("동으로 입력해 주세요!");
        //알림 모달 같은 거 띄우거나 form 에러 띄우기
      }

      //   if (addressList[0].address_type === "REGION") {
      setAddressList(addressList);
      //   }

      //리스트 다~ 마커 표시하기
      //지도가 있으면 원래 있던 지도에 표시하기
      if (mapRef.current) {
        //마커 표시하기 전 지도 축소 위해 옵션 설정
        const mapOption = {
          center: new kakao.maps.LatLng(37.450701, 126.570667),
          level: 4, //13
        };

        const map = new kakao.maps.Map(mapRef.current, mapOption);

        //🌱 지도 경계를 생성합니다.
        const bounds = new kakao.maps.LatLngBounds();
        addressList.forEach((address) => {
          const locPosition = new kakao.maps.LatLng(address.y, address.x);

          const marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width: 150px; padding:1rem; font-size:small">' +
              address.address_name +
              "</div>",
          });

          //마커, 인포 오픈
          infowindow.open(map, marker);
          //🌱 각 위치를 경계에 추가합니다.
          bounds.extend(locPosition);
        });

        //🌱 경계를 설정하여 모든 마커가 한 화면에 보이도록 지도를 조정합니다.
        map.setBounds(bounds);
      }
    } catch (error) {
      console.log("주소와 코드를 가져오지 못했어요!", error);
    }
  }, []);

  //----------------------------------------------------------------------------

  //🌟🌟🌟🌟🌟🌟🌟비트 설정 바꾼거 굳이 안바꾸고 index.html 에서 환경 변수 사용할 수 있으면 없애자~~

  //----------------------------------------------------------------------------

  //🌟🌟리스트 클릭했을 때 마커 찍기
  const handleAddressClick = (index: number) => {
    const { address } = addressList[index];

    const newMyLocation = {
      address: address.address_name,
      code: address.b_code,
    };
    setCurrentAddressAndCode(newMyLocation);
    console.log("👉 ✅ 검색 결과");

    //리스트 다~ 마커 표시하기
    //지도가 있으면 원래 있던 지도에 표시하기
    if (mapRef.current) {
      //마커 표시하기 전 지도 축소 위해 옵션 설정
      const mapOption = {
        center: new kakao.maps.LatLng(address.y, address.x),
        level: 4, //13
      };

      const map = new kakao.maps.Map(mapRef.current, mapOption);
      const locPosition = new kakao.maps.LatLng(address.y, address.x);
      const message =
        '<div style="padding:1.5rem; font-size:small">' +
        address.address_name +
        "</div>"; // 인포윈도우에 표시될 내용입니다

      displayMarker(map, locPosition, message);

      getRegionCodeMapClick(map); //마커 옮기기
    }
    setAddressList([]);
  };

  //----------------------------------------------------------------------------
  //✅ 좌표 값에 해당하는 법정동 정보와 구버전 주소값 얻기
  const getAddressAndCode = async (lon: string, lat: string) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`, // 환경 변수에서 API 키를 가져옵니다.
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

  useEffect(() => {
    // 🌈  카카오맵 불러오기
    const container = mapRef.current; //지도를 담을 영역

    //지도 담을 영역 && 지오로케이션 있으면 지도 그리기 실행
    if (container && geolocation) {
      const lat = geolocation?.lat;
      const lon = geolocation?.lon;
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
        level: 4, //지도의 레벨(확대, 축소 정도)
      };

      //지도 생성 및 객체 리턴
      const map = new kakao.maps.Map(container, options);

      // 지도에 확대 축소 컨트롤을 생성한다
      const zoomControl = new kakao.maps.ZoomControl();
      // 지도의 우측에 확대 축소 컨트롤을 추가한다
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      //----------------------------------------------------------------------------------------------

      //----------------------------------------------------------------------------------------------

      // 🌈  최초: 현재 위치 위도 경도 이용 --> 내 위치 지도에 표시하기
      const initMyLocationInMap = () => {
        try {
          // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
          const lat = geolocation?.lat;
          const lon = geolocation?.lon;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          map.setCenter(locPosition); //맵의 센터로 이동

          getAddressAndCode(lon as string, lat as string); //법정동 주소, 코드 얻기

          //인포 메세지 및 마커 띄우기
          const message =
            '<div style="padding:1.5rem; font-size:small">여기에 계신가요? 👀</div>'; // 인포윈도우에 표시될 내용입니다
          displayMarker(map, locPosition, message); // 마커와 인포윈도우를 표시합니다
        } catch {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
          const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
          const message =
            '<div style="padding:2rem; font-size:small">위치 정보를 사용할 수 없어요 🥲 <br/>위치 정보를 활용할 수 있도록 설정해 주세요.<br/></div>';

          displayMarker(map, locPosition, message);
        }
      };

      initMyLocationInMap();

      //----------------------------------------------------------------------------------------------

      // 🌈🌈 2. 지도 클릭 시 마커/인포 띄우고 주소, 코드 정보 얻기
      getRegionCodeMapClick(map);
    }

    // 클린업 함수
    return () => {
      if (currentMarkerRef.current) {
        currentMarkerRef.current.setMap(null);
      }
      if (currentInfoWindowRef.current) {
        currentInfoWindowRef.current.close();
      }
    };
  }, [
    kakao,
    currentLocation,
    displayMarker,
    geolocation,
    getRegionCodeMapClick,
  ]);

  // useEffect(() => {
  //   if (currentLocation && mapRef.current) {
  //     const mapOption = {
  //       center: new kakao.maps.LatLng(currentLocation.lat, currentLocation.lon),
  //       level: 4,
  //     };

  //     const map = new kakao.maps.Map(mapRef.current, mapOption);
  //     const locPosition = new kakao.maps.LatLng(currentLocation.lat, currentLocation.lon);
  //     const message = '<div style="padding:1.5rem; font-size:small">여기에 계신가요? 👀</div>';

  //     displayMarker(map, locPosition, message);
  //   }
  // }, [currentLocation, kakao, displayMarker]);

  return (
    <MapWrapper>
      <AddressSearchForm onSubmit={handleSearch}>
        <Input
          type="text"
          value={keyword}
          label="주소를 입력하세요. (도로명 주소는 지원하지 않습니다.)"
          onChange={onChangeKeyword}
        />
        <Button type="submit">검색</Button>
      </AddressSearchForm>

      <Map ref={mapRef}>
        <GetMyLocationButton onClick={handleGetMyLocation}>
          <Icon icon={focusIcon} />
        </GetMyLocationButton>
      </Map>
      {addressList.length > 0 ? (
        <SearchResultContainer>
          <h3>검색 결과</h3>
          <ul>
            {addressList.map((address, index) => (
              <li
                key={index}
                onClick={() => {
                  handleAddressClick(index);
                }}
              >
                <p>주소: {address.address_name}</p>
                {/* <p>법정코드(B): {address.address.b_code}</p>
        <p>경도 x(longitude): {address.x}</p>
        <p>위도 y(latitude): {address.y}</p> */}
              </li>
            ))}
          </ul>
        </SearchResultContainer>
      ) : (
        <ButtonWrapper>
          <Button buttonType="secondary" onClick={handleMyLocationCheck}>
            내 위치 확인
          </Button>
        </ButtonWrapper>
      )}
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  height: 100%;
`;

const Map = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border: ${({ theme }) => theme.borders.containerBorder};
`;

const AddressSearchForm = styled.form`
  display: flex;
  flex: row;
  gap: 2rem;
  button {
    width: 20%;
  }
`;

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h3 {
    font-size: medium;
  }

  ul {
    border-top: ${({ theme }) => theme.borders.containerBorder};
  }
  li {
    border-bottom: ${({ theme }) => theme.borders.containerBorder};
    padding: 1.5rem;
    cursor: pointer;
    transition: background-color 0.1s linear;

    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  p {
    font-size: small;
  }
`;

const GetMyLocationButton = styled.button`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  padding: 0.5rem;
  transition: background-color 0.25s linear;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.8);
    color: ${({ theme }) => theme.colors.main};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  button {
    width: 30%;
  }
`;
