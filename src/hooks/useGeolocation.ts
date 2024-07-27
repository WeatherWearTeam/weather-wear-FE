import { useState, useEffect } from "react";

interface ParamsType {
  lat: string;
  lon: string;
}

export default function useGeolocation() {
  const [geolocation, setGeolocation] = useState<ParamsType | null>(null);

  //   const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!navigator.geolocation) {
      throw Error(
        "위치 정보를 얻을 수 없습니다. 위치 정보를 사용할 수 있도록 설정해 주세요."
      );
    }
    // 🌈 브라우저에서 geolocation으로 위치 얻기(위도/경도)
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude; // 위도(y)
      const longitude = position.coords.longitude; // 경도(x)

      setGeolocation({ lat: `${latitude}`, lon: `${longitude}` });
    });
  }, []);

  return { geolocation };
}
