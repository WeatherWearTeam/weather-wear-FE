import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Icon from "@components/Icon";
import useAuth from "@queries/useAuth";
import { useMe } from "@queries/userQueries";
import {
  cakeIcon,
  emailIcon,
  userIcon,
  weatherSunCloudyIcon,
} from "@shared/icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function MyAccount() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { me, isError, isPending, isSuccess } = useMe(isLoggedIn); //처음 Layout nav 바에서 가져올 때, 캐싱한 것 ㅇㅇㅇ...을쓰면 되지 않을런지?

  const getGender = (gender: string) => {
    switch (gender) {
      case "MALE":
        return "남자";
      case "FEMALE":
        return "여자";
      default:
        "남자";
        break;
    }
  };

  //useEffect로 내 정보 먼저 가져와서 채우기
  useEffect(() => {
    if (me) {
      console.log(me);
    }
  }, [me]);

  return (
    <Container>
      <GridContainer>
        <LeftColumn>
          <BackgroundSunWrapper>
            <Circle />
          </BackgroundSunWrapper>
          <TextContainer>
            <Title>내 계정</Title>
            {/* <Text>회원 정보 수정</Text> */}
          </TextContainer>
          <BackgroundCloudWrapper>
            {weatherSunCloudyIcon}
          </BackgroundCloudWrapper>
        </LeftColumn>
        <RightColumn>
          <FormTextContainer>
            <PageTitle>내 계정 정보</PageTitle>
          </FormTextContainer>
          <RightContainer>
            <ImageContainer>
              <ImageWrapper>
                {<Avatar size="xl" image={me?.image as string} />}
              </ImageWrapper>
            </ImageContainer>

            <UserInfoContainer>
              <NickNameWrapper>
                <Nickname>{me?.nickname}님!</Nickname>
              </NickNameWrapper>
              <InfoContainer>
                <InfoTextWrapper>
                  <Icon icon={userIcon} />
                  <InfoTitle>성별</InfoTitle>
                  <InfoText>{getGender(me?.gender as string)}</InfoText>
                </InfoTextWrapper>
                <InfoTextWrapper>
                  <Icon icon={cakeIcon} />
                  <InfoTitle>생년월일</InfoTitle>
                  <InfoText>{me?.birthday}</InfoText>
                </InfoTextWrapper>
                {/* <InfoTextWrapper>
                  <Icon icon={mapPinIcon} />
                  <InfoTitle>위치</InfoTitle>
                  <InfoText>{`대구광역시 ㅇㅇ구 ㅇㅇ길 ㅇㅇㅇ`}</InfoText>
                </InfoTextWrapper> */}
                <InfoTextWrapper>
                  <Icon icon={emailIcon} />
                  <InfoTitle>이메일</InfoTitle>
                  <InfoText>{me?.email}</InfoText>
                </InfoTextWrapper>
              </InfoContainer>
            </UserInfoContainer>

            <ButtonWrapper>
              <Button onClick={() => navigate("/my/setting")}>
                회원 정보 수정하기
              </Button>
            </ButtonWrapper>
          </RightContainer>
        </RightColumn>
      </GridContainer>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 7rem);
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem 4rem 4rem;
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-areas: "left-column right-column";

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "right-column"
      "left-column";

    gap: 2rem;
  }
`;

//✅ 왼쪽
const LeftColumn = styled.div`
  grid-area: left-column;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  background-color: ${({ theme }) => theme.colors.back};
  padding: 10rem;
  position: relative;
  overflow: hidden;
`;

const BackgroundSunWrapper = styled.div`
  opacity: 0.2;
  position: absolute;
  top: -15rem;
  left: -15rem;
  width: 30rem;
  height: 30rem;
`;

const Circle = styled.div`
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  border: 1rem solid ${({ theme }) => theme.colors.WHITE};
`;

const BackgroundCloudWrapper = styled.div`
  opacity: 0.5;
  position: absolute;
  bottom: -10rem;
  right: 0rem;
  width: 30rem;
  height: 30rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Title = styled.h2`
  font-size: xx-large;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.WHITE};
`;

// const Text = styled.div`
//   font-size: medium;
//   color: ${({ theme }) => theme.colors.GRAY};
// `;

//✅ 오른쪽
const RightColumn = styled.div`
  grid-area: right-column;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 10rem;
  gap: 2rem;

  @media (max-width: 900px) {
    padding: 0rem;
  }
`;

const FormTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: xx-large;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.BLACK};
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Label = styled.label`
  /* height: 100%; */
  /* width: 100%; */
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// export const IconWrapper = styled.div`
//   cursor: pointer;
//   width: 30%;
//   color: ${({ theme }) => theme.colors.borderLightGray};
//   transition: color 0.25s linear;

//   &:hover {
//     color: ${({ theme }) => theme.colors.main};
//   }
// `;

export const Preview = styled.img`
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  object-fit: cover;
`;

// ✅ 유저 인포

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 1rem;
`;

const NickNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  border-bottom: ${({ theme }) => theme.borders.containerBorder};
  padding: 2rem;
`;

const Nickname = styled.h3`
  font-size: x-large;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

const InfoTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  width: 60%;
  border-bottom: ${({ theme }) => theme.borders.containerBorder};

  /* svg {
    width: 2.5rem;
    height: 2.5rem;
  } */
`;

const InfoTitle = styled.h5`
  font-size: small;
  font-weight: 600;
`;

const InfoText = styled.p`
  font-size: small;
`;

//버튼

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    width: 60%;
  }
`;
