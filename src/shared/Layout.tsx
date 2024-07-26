import Avatar from "@components/Avatar";
import DropdownLayout from "@components/Modal/DropdownLayout";
import ModalPortal from "@components/Modal/ModalPortal";
import SettingDialog from "@components/Modal/SettingDialog";
import useDropdownPosition from "@hooks/useDropdownPosition";
import useModal from "@hooks/useModal";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  // const isLoggedIn = false; //✅ 임의

  const { openModal, closeModal, isVisible } = useModal();
  const { dropdownPosition, divRef } = useDropdownPosition(isVisible);

  return (
    <>
      <HeaderContainer>
        <Nav>
          <NavLeft>
            <Link to={`/`}>
              <NavItem>웨더웨어</NavItem>
            </Link>
            <StNavLink to={`/`}>
              <NavItem>홈</NavItem>
            </StNavLink>
            <StNavLink to={`/mypage`}>
              <NavItem>마이페이지</NavItem>
            </StNavLink>
            <StNavLink to={`/ootd`}>
              <NavItem>OOTD 트렌드</NavItem>
            </StNavLink>
          </NavLeft>
          <NavRight>
            {/* {isLoggedIn ? ( */}
            <AvatarWrapper ref={divRef}>
              <Avatar size="s" onClick={openModal} />
            </AvatarWrapper>
            {/* ) : ( */}
            <StLink to={`/login`}>
              <NavItem>로그인</NavItem>
            </StLink>
            {/* )} */}

            {isVisible && (
              <ModalPortal>
                <DropdownLayout
                  onClose={closeModal}
                  dropdownPosition={{ ...dropdownPosition }}
                >
                  <SettingDialog onClose={closeModal} />
                </DropdownLayout>
              </ModalPortal>
            )}
          </NavRight>
        </Nav>
      </HeaderContainer>
      <Main>{children}</Main>
    </>
  );
}

export default Layout;

const HeaderContainer = styled.header`
  z-index: 5;
  width: 100%;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  /* box-shadow: 2px 2px 10px ${({ theme }) => theme.colors.borderLightGray}; */
  box-shadow: 2px 2px 10px rgb(239, 239, 239);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 4rem;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  border-radius: 50%;
  cursor: pointer;
`;

const StNavLink = styled(NavLink)`
  transition: color 0.1s linear;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 600;
  }

  &.active {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 600;
  }
`;

const StLink = styled(NavLink)`
  transition: color 0.1s linear;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 600;
  }
`;

// const Logout = styled.button`
//   transition: color 0.1s linear;

//   &:hover,
//   &:focus {
//     color: ${({ theme }) => theme.colors.black};
//     font-weight: 600;
//   }
// `;

const NavItem = styled.span`
  font-size: small;
`;

//네비게이션 바 밑의 메인 영역입니다.
const Main = styled.main`
  margin-top: 7rem;
  height: calc(100vh - 7rem);
  width: 100%;
`;
