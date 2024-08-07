import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const MyPage = () => {
  return (
    <Wrapper>
      <TabContainer>
        <Title>마이 페이지</Title>
        <Tabs>
          <StNavLink to={"myootd"}>
            <NavItem>나의 OOTD</NavItem>
          </StNavLink>
          <StNavLink to={"closet"}>
            <NavItem>내 옷장</NavItem>
          </StNavLink>
          <StNavLink to={"wish"}>
            <NavItem>위시리스트</NavItem>
          </StNavLink>
        </Tabs>
      </TabContainer>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
`;

const TabContainer = styled.div`
  background-color: white;
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  width: 100%;
  height: 50%;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  margin: 0; /* 기본 여백 제거 */
  font-size: x-large;
  font-weight: bold;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
`;

const Tabs = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  width: 100%;
  font-size: 2em; /* h1 크기 */
  box-sizing: border-box;
  /* 패딩과 보더를 포함한 박스 크기 조정 */
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 3rem; /* 간격 조정 */
  border-bottom: ${({ theme }) =>
    theme.borders.containerBorder}; /* 하단의 수평선 */
`;

const StNavLink = styled(NavLink)`
  transition: color 0.1s linear;
  padding-bottom: 1rem;
  padding-right: 3rem;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.BLACK};
    font-weight: 600;
  }

  &.active {
    color: ${({ theme }) => theme.colors.BLACK};
    font-weight: 600;
    border-bottom: 1.5px solid ${({ theme }) => theme.colors.BLACK}; /* 하단의 수평선 */
  }
`;

const NavItem = styled.span`
  font-size: medium;
`;

//마이페이지의 탭 바 밑의 메인 영역입니다.
const OutletWrapper = styled.div`
  /* width: 100%; */
  height: calc(100vh - 18rem);
  /* background-color: green; */
`;
