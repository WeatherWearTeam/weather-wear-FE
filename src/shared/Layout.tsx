import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <HeaderContainer>
        <Nav>
          <NavLeft>
            <NavItem href="#logo">로고?</NavItem>
            <NavItem href="/">홈</NavItem>
            <NavItem href="/mypage">마이페이지</NavItem>
            <NavItem href="/ootd">OOTD 트렌드</NavItem>
            {/* ✅ 근우님~! 리액트 라우터 돔에서 제공하는 Link 를 사용하여 네비게이팅을 해보세요! */}
          </NavLeft>
          <NavRight>
            <NavItem href="#logout">Logout</NavItem>
          </NavRight>
        </Nav>
      </HeaderContainer>
      <Main>{children}</Main>
    </>
  );
}

export default Layout;

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%;
  padding: 0 15px; /* 패딩을 수정하여 네비게이션 바 내의 간격 조정 */
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 60px; /* 간격 조정 */
  padding: 50px;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  margin-left: auto; /* NavRight를 오른쪽 끝으로 보냄 */
`;

const NavItem = styled.a`
  color: black;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

//네비게이션 바 밑의 메인 영역입니다.
const Main = styled.main`
  margin-top: 7rem;
  height: calc(100vh - 7rem);
  width: 100%;
`;
