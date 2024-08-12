import api from "@api/api";

export interface WeatherData {
  id: number;
  pop: number | null; //강수확률 (%)
  pty: number | null; //강수 형태: 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
  pcp: number | null; //1시간 강수량 (mm)
  reh: number | null; //습도 (%)
  sno: number | null; //1시간 신적설(cm)
  sky: number | null; //하늘상태: 맑음(1), 구름조금(2), 구름많음(3), 흐림(4)
  tmp: number | null; //1시간 기온
  tmn: number | null; //일 최저기온
  tmx: number | null; //일 최고기온
  uuu: number | null; //풍속(동서성분) (m/s)
  vvv: number | null; //풍속(남북성분) (m/s)
  wav: number | null; //파고(M)
  vec: number | null; //풍향(deg)
  wsd: number | null; //풍속(m/s) ~4(약) / 4~8.9(약간강) / 9~13.9(강) / 14~ (매우강)
}

// 전체 날씨 조회
export const getWeatherByLocation = async (
  id: number
): Promise<WeatherData> => {
  try {
    const response = await api.get(`/api/weathers?id=${id}`, {
      withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
    });
    return response.data;
  } catch (error) {
    console.error("날씨 정보를 가져오는데 실패했습니다:", error);
    throw error;
  }
};
