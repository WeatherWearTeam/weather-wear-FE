import styled from "styled-components";
import Search from "@components/Search";
import AddButton from "@components/AddButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyBoards, useDeleteBoard } from "@queries/boardQueries";
import MyBoardList from "@components/Board/MyBoardList";
import Pagination from "@components/pagination";
import { useEffect, useState } from "react";
import { UserBoardsSearchKeysRequest } from "@api/boardApi";
import WeatherBar from "@components/Weather/WeatherBar";

interface WeatherIconTypes {
  sky: number | null;
  pty: number | null;
}

function Posts() {
  const navigate = useNavigate();
  const location = useLocation();

  //////////////////////////////////////////////////////////////
  const [searchKeys, setSearchKeys] = useState<UserBoardsSearchKeysRequest>({
    page: 1,
    pty: null,
    sky: null,
    keyword: null,
  });

  const handlePageChange = (newPage: number) => {
    setSearchKeys((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleKeywordSubmit = (keyword: string) => {
    setSearchKeys((prev) => ({
      ...prev,
      keyword,
    }));
  };

  const [selectedWeather, setSelectedWeather] = useState<WeatherIconTypes>({
    sky: null,
    pty: null,
  });

  const handleWeatherClick = (sky: number | null, pty: number | null) => {
    setSelectedWeather({ sky, pty });
    setSearchKeys((prev) => ({
      ...prev,
      sky, //: sky ?? prev.sky, //sky가 null인 경우 기존 sky 값 유지
      pty, //: pty ?? prev.pty, //pty가 null인 경우 기존 pty 값 유지
      page: 1,
    }));
  };
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (searchKeys.sky !== null) {
      queryParams.set("sky", String(searchKeys.sky));
    } else {
      queryParams.delete("sky");
    }

    if (searchKeys.pty !== null) {
      queryParams.set("pty", String(searchKeys.pty));
    } else {
      queryParams.delete("pty");
    }

    if (searchKeys.keyword) {
      queryParams.set("keyword", searchKeys.keyword);
    } else {
      queryParams.delete("keyword");
    }

    navigate(`?${(queryParams.toString(), { replace: true })}`);
  }, [searchKeys, navigate, location.search]);

  //////////////////////////////////////////////////////////////
  const handleItemClick = (id: number) => {
    navigate(`/ootd/${id}`);
  };

  const { boards, isPending, isError, isSuccess } = useMyBoards(searchKeys);
  const { mutateDeleteBoard, isErrorDelete, isPendingDelete } =
    useDeleteBoard();

  console.log("✅✅✅마이 보드!", boards);

  return (
    <MyPageContentsContainer>
      <HeaderContainer>
        <WeatherBarWrapper>
          <WeatherBar
            onClick={handleWeatherClick}
            selectedWeather={selectedWeather}
          />
        </WeatherBarWrapper>
        <SearchWrapper>
          <SearchWrapper>
            <Search onSearchKeyword={handleKeywordSubmit} />
          </SearchWrapper>
        </SearchWrapper>
      </HeaderContainer>
      {isSuccess && boards?.content && (
        <MyBoardList
          items={boards.content}
          onClick={handleItemClick}
          onDeleteClick={mutateDeleteBoard}
          isSuccess={isSuccess}
        />
      )}
      {isSuccess && boards?.content.length < 1 && (
        <div>아직 올린 게시글이 없어요!</div>
      )}
      {/* {isPending && <div>로딩중...</div>} */}
      {isError && <div>에러 발생!</div>}
      <ContentsFooter>
        <Pagination
          totalPages={boards?.totalPages} //총 아이템 수 //많아지면 버튼 생김
          pageCount={5} //5페이지씩 보여주기
          currentPage={
            searchKeys.page && searchKeys?.page > 0 ? searchKeys?.page : 1
          } //현재 페이지
          onPageChange={handlePageChange}
        />
        <AddButton onClick={() => navigate(`/ootd/add`)} />
      </ContentsFooter>
    </MyPageContentsContainer>
  );
}

export default Posts;

const MyPageContentsContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  height: calc(100vh - 16rem);
  position: fixed;
  /* top: 17.5rem; */
  top: 16.2rem; //픽스 위치 조정
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
`;

const HeaderContainer = styled.div`
  width: 100%;
  /* max-width: 1220px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0 2rem 2rem;
  box-sizing: border-box;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const WeatherBarWrapper = styled.div`
  display: flex;
  width: 300px;
  height: 40px;
`;

const SearchWrapper = styled.div`
  width: 300px;
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
