import api from "@api/api";

export interface WeatherDatas {
  id: number;
  pop: number | null;
  pty: number | null;
  pcp: number | null;
  reh: number | null;
  sno: number | null;
  sky: number | null;
  tmp: number | null;
  tmn: number | null;
  uuu: number | null;
  wav: number | null;
  tmx: number | null;
  wsd: number | null;
  vec: number | null;
  vvv: number | null;
}

export interface WeatherDataById {
  id: number;
  stn: number | null;
  ta: number | null;
  sky: number | null;
  prep: number | null;
}

// 전체 날씨 조회
export const getWeatherByLocation = async (id: number) => {
  console.log("법정동코드", id);
  try {
    const response = await api.get(`/api/weathers?id=${id}`, {
      withCredentials: false, //퍼블릭 페이지: 자격 증명 포함하지 않음
    });
    console.log("리스폰", response);
    return response.data;
  } catch (error) {
    console.error("날씨 정보를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// export interface RequstsParams {
//   stn: number;
//   date: string;
// }

// export const getWeatherRequsts = async ({ stn, date }: RequstsParams) => {
//   const response = await api.get(`/api/weathers/${stn}`, {
//     params: { stn, date },
//   });
//   return response.data;
// };

// 특정 날씨 조회
export const getSpecificWeather = async (id: number) => {
  try {
    const response = await api.get(`/api/weathers/${id}`);
    return response.data;
  } catch (error) {
    console.error("특정 날씨 정보를 가져오는데 실패했습니다:", error);
    throw error;
  }
};
