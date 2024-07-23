import styled from "styled-components";

function Header() {
    return (
        <HeaderContainer>
            <Nav>
                <NavLeft>
                <NavItem href="#logo">로고?</NavItem>
                    <NavItem href="#home">홈</NavItem>
                    <NavItem href="#mypage">마이페이지</NavItem>
                    <NavItem href="#ootd">OOTD</NavItem>
                </NavLeft>
                <NavRight>
                    <NavItem href="#logout">Logout</NavItem>
                </NavRight>
            </Nav>
        </HeaderContainer>
    );
}

export default Header;

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
  padding: 20px;
`;

const NavItem = styled.a`
  color: black;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;
