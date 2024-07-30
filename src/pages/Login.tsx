import Button from "@components/Button";
import Icon from "@components/Icon";
import Input from "@components/Input";
import { kakaoIcon, weatherSunCloudyIcon } from "@shared/icons";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Login() {
  const navigate = useNavigate();
  return (
    <Container>
      <GridContainer>
        <LeftColumn>
          <BackgroundSunWrapper>
            <Circle />
          </BackgroundSunWrapper>
          <TextContainer>
            <Title>
              패션과 날씨,
              <br />
              이제 웨더웨어에서 한 번에!
              {/* 지금 웨더웨어에서
            <br />
            스마트한 OOTD 스타일링을
            <br />
            시작하세요! */}
              {/* 날씨에 딱 맞는 옷차림,
            <br />
            웨더웨어에서 찾으세요! */}
            </Title>
            <Text>
              웨더웨어에 가입하시면 날씨를 고려한 개인 맞춤형 옷차림을
              추천해드립니다.
              <br />
              <br />
              오늘의 날씨에 딱 맞는 나만의 특별한 OOTD로 스타일리시하게 하루를
              시작해보세요!
            </Text>
          </TextContainer>
          <BackgroundCloudWrapper>
            {weatherSunCloudyIcon}
          </BackgroundCloudWrapper>
        </LeftColumn>
        <RightColumn>
          <FormTextContainer>
            <FormTitle>로그인</FormTitle>
            <FormText>지금 웨더웨어를 시작하세요!</FormText>
          </FormTextContainer>
          <FormContainer>
            <Form>
              <Input label="이메일" type="email" />
              <Input label="비밀번호" type="password" />

              <Button>로그인</Button>
            </Form>
            <LinkWrapper>
              비밀번호가 기억나지 않아요.
              <LinkToLogin to={`/login`}>비밀번호 찾기</LinkToLogin>
              {/* 아직 회원이 아닌가요?
              <LinkToLogin to={`/login`}>가입하기</LinkToLogin> */}
            </LinkWrapper>
            {/* <SeparateBorder>
              <span>아직 회원이 아닌가요?</span>
            </SeparateBorder> */}
            <Button
              buttonType="secondary"
              onClick={() => {
                navigate(`/signup`);
              }}
            >
              가입하기
            </Button>
            <SocialLoginContainer>
              <SeparateBorder>
                <span>또는 SNS 계정으로 시작하기</span>
              </SeparateBorder>
              {/* SNS 계정으로 로그인 */}
              <SocialLoginIconWrapper>
                <Icon icon={kakaoIcon} />
              </SocialLoginIconWrapper>
            </SocialLoginContainer>
          </FormContainer>
        </RightColumn>
      </GridContainer>
    </Container>
  );
}

const Container = styled.div`
  /* height: calc(100vh - 7rem); */
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

  height: calc(100vh - 13rem);

  @media (max-width: 900px) {
    height: inherit;
  }
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
  border: 1rem solid ${({ theme }) => theme.colors.white};
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
  color: ${({ theme }) => theme.colors.white};
`;

const Text = styled.div`
  font-size: medium;
  color: ${({ theme }) => theme.colors.gray};
`;

//✅ 오른쪽
const RightColumn = styled.div`
  grid-area: right-column;
  display: flex;
  flex-direction: column;
  padding: 3.8rem 20rem;
  gap: 4rem;

  @media (max-width: 1200px) {
    padding: 3.8rem 10rem;
  }

  @media (max-width: 900px) {
    padding: 0rem;
  }
`;

const FormTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled.h1`
  font-size: xx-large;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.black};
`;

const FormText = styled.p`
  font-size: large;
`;

// 폼 , 소셜로그인 컨테이너
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

//📝 폼
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

//

const LinkWrapper = styled.div`
  font-size: small;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
const LinkToLogin = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  font-size: small;
`;

//✅ 소셜로그인

const SocialLoginContainer = styled.div`
  font-size: small;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SeparateBorder = styled.div`
  width: 100%;
  position: relative;
  border-bottom: ${({ theme }) => theme.borders.containerBorder};
  margin: 2rem 0;
  span {
    font-size: small;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 0 1rem;
  }
`;

const SocialLoginIconWrapper = styled.button`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.yellow};
  width: 4rem;
  height: 4rem;
  transition: background-color 0.1s linear;

  &:hover,
  &:focus {
    background-color: #ffae00;
  }
`;
