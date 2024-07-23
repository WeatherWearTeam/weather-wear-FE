import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const MyPage = () => {
  return (
    <Wrapper>
      <MainTitleContainer>
        <MainTitleTop>마이 페이지</MainTitleTop>
        <MainTitleBottom>
          <Link to="myootd">
            <MainTitleSelectedItem>나의 OOTD</MainTitleSelectedItem>
          </Link>
          <Link to="closet">
            <MainTitleItem>내 옷장</MainTitleItem>
          </Link>
          <Link to="wish">
            <MainTitleItem>위시리스트</MainTitleItem>
          </Link>
        </MainTitleBottom>
      </MainTitleContainer>
      {/* 리액트 라우터의 아울렛 사용하여 탭 처럼 보이게 페이지 만들기 */}
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column; /* 수직 정렬 */
  align-items: flex-start; /* 상단 정렬 */
  padding: 0 3rem;
`;

const MainTitleContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MainTitleTop = styled.div`
  color: black;
  width: 100%;
  height: 50%;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  margin: 0; /* 기본 여백 제거 */
  padding: 0 20px; /* 텍스트와 컨테이너 사이에 여백 추가 */
  font-size: 24px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
`;

const MainTitleBottom = styled.div`
  color: black;
  width: 100%;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  margin: 0; /* 기본 여백 제거 */
  padding: 0 20px; /* 텍스트와 컨테이너 사이에 여백 추가 */
  font-size: 2em; /* h1 크기 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 80px; /* 간격 조정 */
  border-bottom: 1px solid gray; /* 하단의 수평선 */
`;

const MainTitleSelectedItem = styled.div`
  background-color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const MainTitleItem = styled.div`
  background-color: white;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

//마이페이지의 탭 바 밑의 메인 영역입니다.
const OutletWrapper = styled.div`
  height: calc(100vh - 7rem);
  width: 100%;
  padding: 1rem 2rem;
`;
