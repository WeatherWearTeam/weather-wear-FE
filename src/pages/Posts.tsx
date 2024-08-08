import styled from "styled-components";
import Search from "@components/Search";
import PageMoveButton from "@components/PageMoveButton";
import AddButton from "@components/AddButton";
import { useNavigate } from "react-router-dom";
import WeatherBar from "@components/WeatherBar";
import { useBoards, useDeleteBoard } from "@queries/boardQueries";
import MyBoardList from "@components/Board/MyBoardList";

function Posts() {
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/ootd/${id}`);
  };

  const { boards, isPending, isError, isSuccess } = useBoards();
  const { mutateDeleteBoard, isErrorDelete, isPendingDelete } =
    useDeleteBoard();

  console.log(boards);

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
      <MyBoardList
        items={boards!}
        onClick={handleItemClick}
        onDeleteClick={mutateDeleteBoard}
      />
      <ContentsFooter>
        <PageMoveButton />
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
  background-color: green;
`;

const HeaderContainer = styled.div`
  width: 100%;
  /* max-width: 1220px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2rem 3rem;
  box-sizing: border-box;
  gap: 1rem;
  justify-content: space-between;

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
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1220px;
  /* flex-shrink: 0; */
  background-color: pink;
`;
