import { useInfiniteQuery } from "@tanstack/react-query";
import { getBoardsTrendItems } from "@api/trendApi";

// 트렌드 게시물 조회
export const useTrendItems = (searchKeys: {
  color: string | null;
  type: string | null;
  keyword: string | null;
  //lastId 빼고
}) => {
  const {
    data: trendItemsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["trendItems", searchKeys],
    queryFn: ({ pageParam = null }) =>
      getBoardsTrendItems({ ...searchKeys, lastId: pageParam }),
    initialPageParam: null, // v5 달라진 점 -> 본인이 불러와야 하는 첫 페이지를 지정!
    getNextPageParam: (lastPage) => {
      // lastPage는 현재 페이지에서 받은 데이터 배열입니다.
      // 마지막 항목의 ID를 추출하여 다음 페이지 요청에 사용
      return lastPage.length > 0 ? lastPage[lastPage.length - 1].id : undefined;
      // if (lastPage.data.total_places) {
      //   const totalPages = Math.ceil(lastPage.data.total_places / 12); // 총 페이지 개수값 구하기
      //   return allPages.length < totalPages ? allPages.length + 1 : undefined;
      // }
      // return값이 pageParam으로 전달
    },
    // enabled: searchKeys.keyword.length > 0, //검색어 없으면 요청 X

    // retry: 0,
  });

  return { trendItemsData, fetchNextPage, hasNextPage, isFetchingNextPage };
};
