import Avatar from "@components/Avatar";
import DropdownLayout from "@components/Modal/DropdownLayout";
import ModalPortal from "@components/Modal/ModalPortal";
import SettingDialog from "@components/Modal/SettingDialog";
import useDropdownPosition from "@hooks/useDropdownPosition";
import useModal from "@hooks/useModal";
import useAuth from "@queries/useAuth";
import { useMe } from "@queries/userQueries";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import WeatherWearLogo from "@assets/images/logoimg.png";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isLoggedIn, mutateLogout, isPendingLogout } = useAuth();

  const {
    me,
    // , isError, isPending, isSuccess
  } = useMe(isLoggedIn); //isLoggedIn이 true일 때만 useMe 호출되도록
  const { openModal, closeModal, isVisible } = useModal();
  const { dropdownPosition, divRef } = useDropdownPosition(isVisible);

  useEffect(() => {
    if (isLoggedIn && me) {
      //console.log("👋🏻", me);
    }
  }, [isLoggedIn, me]);
  return (
    <>
      <HeaderContainer>
        <Nav>
          <NavLeft>
            <LogoWrapper to={`/`}>
              <img
                src={WeatherWearLogo}
                alt="WeatherWear Logo"
                style={{ height: "50px", width: "auto" }}
              />
            </LogoWrapper>
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
            {isLoggedIn ? (
              <AvatarWrapper ref={divRef}>
                <Avatar
                  size="s"
                  onClick={openModal}
                  image={me?.image as string}
                />
              </AvatarWrapper>
            ) : (
              <StLink to={`/login`}>
                <NavItem>로그인</NavItem>
              </StLink>
            )}

            {isVisible && (
              <ModalPortal>
                <DropdownLayout
                  onClose={closeModal}
                  dropdownPosition={{ ...dropdownPosition }}
                >
                  <SettingDialog
                    onClose={closeModal}
                    onLogout={mutateLogout}
                    isPendingLogout={isPendingLogout}
                    myImage={me?.image as string}
                    myNickname={me?.nickname as string}
                    myEmail={me?.email as string}
                  />
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
  // flex: 1; // 추가
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
    color: ${({ theme }) => theme.colors.BLACK};
    font-weight: 600;
  }

  &.active {
    color: ${({ theme }) => theme.colors.BLACK};
    font-weight: 600;
  }
`;

const StLink = styled(NavLink)`
  transition: color 0.1s linear;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.BLACK};
    font-weight: 600;
  }
`;

// const Logout = styled.button`
//   transition: color 0.1s linear;

//   &:hover,
//   &:focus {
//     color: ${({ theme }) => theme.colors.BLACK};
//     font-weight: 600;
//   }
// `;

const NavItem = styled.span`
  font-size: small;
  @media (max-width: 395px) {
    font-size: 11px;
  }
`;

//네비게이션 바 밑의 메인 영역입니다.
const Main = styled.main`
  margin-top: 5rem;
  height: calc(100vh - 5rem);
  width: 100%;
`;

const LogoWrapper = styled(Link)`
  display: flex;

  align-items: center;
  flex: 1;
  padding: 0.5rem 0; // 상하 여백 추가
`;
