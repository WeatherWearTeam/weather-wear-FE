import { useQuery } from "@tanstack/react-query";
import { getWeatherByLocation } from "@/api/weatherApi";

// 전체 조회
export const useWeatherData = (addressId: number) => {
  const {
    data: weatherData,
    isPending: isPendingWeather,
    isError: isErrorWeather,
    isSuccess: isSuccessWeather,
  } = useQuery({
    queryKey: ["homeWeather", addressId],
    queryFn: () => getWeatherByLocation(addressId),
    enabled: !!addressId,
  });

  return { weatherData, isPendingWeather, isErrorWeather, isSuccessWeather };
};
