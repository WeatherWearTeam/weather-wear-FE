import { useQuery } from "@tanstack/react-query";
import {
  getWeatherByLocation,
  getWeatherRequsts,
  getSpecificWeather,
} from "@/api/weatherApi";

// 전체 조회
export const useHomeWeatherDatas = (id: number) => {
  const {
    data: homeWeatherDatas,
    isPending: weatherPending,
    isError: weatherError,
    isSuccess: weatherSuccess,
  } = useQuery({
    queryKey: ["homeweather"],
    queryFn: () => getWeatherByLocation(id),
    enabled: !!id,
  });

  return { homeWeatherDatas, weatherPending, weatherError, weatherSuccess };
};

// 특정 조회
export const useSpecificWeatherData = (id: number) => {
  const {
    data: specificWeatherData,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["specificWeatherdata"],
    queryFn: () => getSpecificWeather(id),
  });

  return { specificWeatherData, isPending, isError, isSuccess };
};
