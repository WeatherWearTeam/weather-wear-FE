import styled from "styled-components";
import Search from "@components/Search";
import PageMoveButton from "@components/PageMoveButton";
import AddButton from "@components/AddButton";
import { useLocation, useNavigate } from "react-router-dom";
import WeatherBar from "@components/WeatherBar";
import { useMyBoards, useDeleteBoard } from "@queries/boardQueries";
import MyBoardList from "@components/Board/MyBoardList";
import Pagination from "@components/pagination";
import { useEffect, useState } from "react";
import { UserBoardsSearchKeysRequest } from "@api/boardApi";

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

  // const [selectedColor, setSelectedColor] = useState<ClothesColorType | null>(
  //   null
  // );

  // const [selectedClothesType, setSelectedClothesType] =
  //   useState<SelectedClothesState>({
  //     type: null,
  //     typeKorean: "옷 종류", // 초기값을 null로 설정
  //   });

  const handlePageChange = (newPage: number) => {
    setSearchKeys((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  // const handleColorChange = (newColor: ClothesColorType) => {
  //   setSearchKeys((prev) => ({
  //     ...prev,
  //     color: newColor,
  //     page: 1,
  //   }));
  // };

  // // 색상 클릭 핸들러
  // const handleColorClick = (color: ClothesColorType) => {
  //   console.log("🌈", color);
  //   setSelectedColor(color); //url에 값 넣기
  //   handleColorChange(color); //실제 값 변경
  // };

  // const handleTypeChange = (newType: ClothesType) => {
  //   setSearchKeys((prev) => ({
  //     ...prev,
  //     type: newType,
  //     page: 1,
  //   }));
  // };

  // const handleSelectType = (
  //   type: ClothesType,
  //   typeKorean: ClothesKoreanType
  // ) => {
  //   console.log("✅", selectedClothesType);

  //   setSelectedClothesType((prev) => ({
  //     ...prev,
  //     type,
  //     typeKorean,
  //   }));

  //   handleTypeChange(type);
  // };

  //////////////////////////////////////////////////////////////

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // if (selectedClothesType.type) {
    //   queryParams.set("type", selectedClothesType.type);
    // } else {
    //   queryParams.delete("type");
    // }

    // if (selectedColor) {
    //   queryParams.set("color", selectedColor);
    // } else {
    //   queryParams.delete("color");
    // }

    navigate(`?${queryParams.toString()}`);
  }, [navigate, location.search]);

  //////////////////////////////////////////////////////////////
  const handleItemClick = (id: number) => {
    navigate(`/ootd/${id}`);
  };

  const { boards, isPending, isError, isSuccess } = useMyBoards();
  const { mutateDeleteBoard, isErrorDelete, isPendingDelete } =
    useDeleteBoard();

  console.log("✅✅✅마이 보드!", boards);

  return (
    <MyPageContentsContainer>
      <HeaderContainer>
        <WeatherBarWrapper>
          <WeatherBar />
        </WeatherBarWrapper>
        <SearchWrapper>
          <Search />
        </SearchWrapper>
      </HeaderContainer>
      <MainContainer>
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
      </MainContainer>
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
  /* background-color: green; */
`;

const HeaderContainer = styled.div`
  width: 100%;
  /* max-width: 1220px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
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

const MainContainer = styled.div`
  max-width: 100rem;
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
