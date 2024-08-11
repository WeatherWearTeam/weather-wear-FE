import styled from "styled-components";
import AddButton from "@components/AddButton";
import { trendingIcon } from "@shared/icons";
import TrendGrid from "@components/Trend/TrendGrid";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "@components/Search";
import { useTrendItems } from "@queries/trendQueries";
import { useEffect, useState } from "react";
import { TrendItemResponse } from "@api/trendApi";
import Button from "@components/Button";
import { TrendSearchKeysRequest } from "@api/boardApi";
import { ClothesColorType } from "@shared/colorTypeList";
import clothesTypeList, {
  ClothesKoreanType,
  ClothesType,
} from "@shared/clothesTypeList";
import Select from "@components/Select/Select";
import ColorPickBar from "@components/Color/ColorPickBar";

interface SelectedClothesState {
  type: ClothesType | null;
  typeKorean: ClothesKoreanType | "옷 종류";
}

function Trend() {
  const navigate = useNavigate();
  const location = useLocation();

  ///////////////////////////////////////////////////////
  const [searchKeys, setSearchKeys] = useState<TrendSearchKeysRequest>({
    color: null,
    type: null,
    keyword: null,
  });

  const handleKeywordSubmit = (keyword: string) => {
    setSearchKeys((prev) => ({
      ...prev,
      keyword,
    }));
  };

  ///////////////////////////////////////////////////////

  const [selectedColor, setSelectedColor] = useState<ClothesColorType | null>(
    null
  );

  const [selectedClothesType, setSelectedClothesType] =
    useState<SelectedClothesState>({
      type: null,
      typeKorean: "옷 종류", // 초기값을 null로 설정
    });

  const handleColorChange = (newColor: ClothesColorType) => {
    setSearchKeys((prev) => ({
      ...prev,
      color: newColor,
      page: 1,
    }));
  };

  // 색상 클릭 핸들러
  const handleColorClick = (color: ClothesColorType) => {
    setSelectedColor(color); //url에 값 넣기
    handleColorChange(color); //실제 값 변경
  };

  const handleTypeChange = (newType: ClothesType) => {
    setSearchKeys((prev) => ({
      ...prev,
      type: newType,
      page: 1,
    }));
  };

  const handleSelectType = (
    type: ClothesType,
    typeKorean: ClothesKoreanType
  ) => {
    console.log("✅", selectedClothesType);

    setSelectedClothesType((prev) => ({
      ...prev,
      type,
      typeKorean,
    }));

    handleTypeChange(type);
  };

  //////////////////////////////////////////////////////////////
  //상태 변경될 때 url 업데이트하기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (searchKeys.color) {
      queryParams.set("color", searchKeys.color);
    } else {
      queryParams.delete("color");
    }

    if (searchKeys.type) {
      queryParams.set("type", searchKeys.type);
    } else {
      queryParams.delete("type");
    }

    if (searchKeys.keyword) {
      queryParams.set("keyword", searchKeys.keyword);
    } else {
      queryParams.delete("keyword");
    }

    navigate(`?${queryParams.toString()}`, { replace: true }); // 히스토리 스택 안남기려면 추가
  }, [searchKeys, navigate, location.search]); //searchKeys 변경시 url 업데이트

  ///////////////////////////////////////////////////////
  const { trendItemsData, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTrendItems(searchKeys);

  console.log("🍧Trend Items Data🍧", trendItemsData);
  //trendItemsData.pageParams: [null]
  //trendItemsData.pages는 배열, 각 인덱스 마다 데이터 8개씩 들어 오게 됨 -> 배열 안에 배열

  return (
    <>
      <TrendHeader>
        <MainTitleContainer>
          <MainTitleTop>
            OOTD 트렌드
            <IconWrapper>{trendingIcon}</IconWrapper>
          </MainTitleTop>
          <TrendSearch>
            <SelectWrapper>
              <Select
                list={clothesTypeList}
                onClick={handleSelectType}
                value={selectedClothesType.typeKorean}
              />
            </SelectWrapper>
            <SelectWrapper>
              <ColorPickBar onClick={handleColorClick} />
            </SelectWrapper>
            <SearchWrapper>
              <Search onSearchKeyword={handleKeywordSubmit} />
            </SearchWrapper>
          </TrendSearch>
        </MainTitleContainer>
      </TrendHeader>
      <MyPageContentsContainer>
        {/* 메인  */}
        {(!trendItemsData || trendItemsData?.pages.length === 0) && (
          <UXText>게시글이 없어요!</UXText>
        )}
        <TrendGrid
          trendItemsData={trendItemsData?.pages as TrendItemResponse[][]}
        />
        {isFetchingNextPage && <UXText>...</UXText>}
        {/* 메인  */}
        <ContentsFooter>
          {/* 더보기 버튼 */}
          <MoreButtonWrapper>
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              더보기
            </Button>
          </MoreButtonWrapper>
          {/* 더보기 버튼 */}

          <AddButton onClick={() => navigate(`/ootd/add`)} />
        </ContentsFooter>
      </MyPageContentsContainer>
    </>
  );
}

export default Trend;

const TrendHeader = styled.div`
  width: 100%;
  /* position: fixed;
  left: 0;
  right: 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
`;

const MainTitleContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

const MainTitleTop = styled.div`
  color: black;
  text-align: left;
  margin: 0;
  padding: 0 20px;
  font-size: x-large;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
`;

const TrendSearch = styled.div`
  font-size: 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

/////////////////////////////////////////////////////////////////

const MyPageContentsContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  /* height: calc(100vh - 16rem); */
  /* position: fixed; */
  /* top: 17.5rem; */
  top: 16.2rem; //픽스 위치 조정
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  /* background-color: green; */
`;

const ContentsFooter = styled.div`
  padding: 4rem;
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1220px;
  /* flex-shrink: 0; */
`;

const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  button {
    width: 20rem;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 300px;
  padding-left: 20px;
`;

const SelectWrapper = styled.div`
  flex: 1;
  width: 37rem;
  max-width: 37rem;
  box-sizing: border-box;
`;

const UXText = styled.div`
  padding: 2rem;
  font-size: small;
`;
