import Button from "@components/Button";
import Icon from "@components/Icon";
import Input from "@components/Input";
import SelectButton from "@components/SelectButton";
import { kakaoIcon, weatherSunCloudyIcon } from "@shared/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Signup() {
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
            <FormTitle>회원가입</FormTitle>
            <FormText>지금 웨더웨어를 시작하세요!</FormText>
          </FormTextContainer>
          <FormContainer>
            <Form>
              <Input label="이메일" type="email" />
              <FlexRow>
                <Input label="비밀번호" type="password" />
                <Input label="비밀번호" type="password" />
              </FlexRow>

              <FlexRow>
                <Input label="닉네임" type="text" />
                <SelectButton selectedOption="위치" />
              </FlexRow>

              <FlexRow>
                <Input label="생년월일" type="date" />

                <Fieldset>
                  <Legend>성별</Legend>
                  <InputContainer>
                    <RadioInputWrapper>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="남자"
                      />
                      <label htmlFor="male">남자</label>
                    </RadioInputWrapper>
                    <RadioInputWrapper>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="여자"
                      />
                      <label htmlFor="female">여자</label>
                    </RadioInputWrapper>
                  </InputContainer>
                </Fieldset>
              </FlexRow>
              <Button>가입하기</Button>
            </Form>
            <LinkWrapper>
              이미 가입하셨나요?
              <LinkToLogin to={`/login`}>로그인하기</LinkToLogin>
            </LinkWrapper>
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
  padding: 1.5rem 10rem;
  gap: 4rem;

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

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

const Fieldset = styled.fieldset`
  border: ${({ theme }) => theme.borders.containerBorder};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 2rem;
  position: relative;
`;

const Legend = styled.legend`
  position: absolute;
  left: 1rem;
  top: 50%; //수직 중앙
  transform: translateY(-50%); //중앙정렬
  font-size: small;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 3.5rem;
`;

const RadioInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  label {
    font-size: small;
  }
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
