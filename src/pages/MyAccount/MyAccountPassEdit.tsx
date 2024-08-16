import AlertText from "@components/AlertText";
import Button from "@components/Button";
import Input from "@components/Input";
import useError from "@hooks/useError";
import { useUpdatePassword } from "@queries/userQueries";
import { weatherSunCloudyIcon } from "@shared/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function MyAccountPassEdit() {
  const navigate = useNavigate();
  const { errorMessage, alertErrorMessage, deleteErrorMessage } = useError();

  const { mutateUpdatePassword, updatePasswordError } = useUpdatePassword();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordCheck: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    deleteErrorMessage();
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 포함하는 정규식
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    //폼 검증
    if (
      !passwords.currentPassword.trim() ||
      !passwords.newPassword.trim() ||
      !passwords.newPasswordCheck.trim()
    ) {
      return alertErrorMessage("모든 값을 입력해주세요.");
    }

    if (
      !passwords.newPassword.trim() ||
      !(
        passwords.newPassword.length > 7 && passwords.newPassword.length < 16
      ) ||
      !regex.test(passwords.newPassword)
    ) {
      return alertErrorMessage(
        "비밀번호는 8-15자 길이여야 하며, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 포함해야 합니다."
      );
    }

    // currentPassword 이거 검증 어떻게 하지? -> 일단 수정버튼 눌러서 내고, 서버에서 검증해서 결과 알려주기 ㅇㅇ
    // if (passwords.currentPassword === passwords.newPassword) {
    //   return alertErrorMessage(
    //     "현재 비밀번호와 같은 비밀번호로 바꿀 수 없습니다."
    //   );
    // }

    if (passwords.newPassword !== passwords.newPasswordCheck) {
      return alertErrorMessage("바꾸려고 하는 비밀번호가 일치하지 않습니다.");
    }

    //비동기 통신
    mutateUpdatePassword(passwords);
  };

  //useEffect로 내 정보 먼저 가져와서 폼 채우기

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
            <FormTitle>회원 정보 수정</FormTitle>
            {/* <FormText>지금 웨더웨어를 시작하세요!</FormText> */}
          </FormTextContainer>
          <FormContainer>
            <Form name="photo" onSubmit={handleSubmit}>
              <InputContainer>
                <Input
                  label="현재 비밀번호"
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleChange}
                />
                <Input
                  label="새로운 비밀번호"
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                />
                <Input
                  label="새로운 비밀번호 확인"
                  type="password"
                  name="newPasswordCheck"
                  value={passwords.newPasswordCheck}
                  onChange={handleChange}
                />
                <AlertText>
                  {errorMessage ||
                    (updatePasswordError &&
                      (updatePasswordError?.response?.data as string))}
                </AlertText>
                <ButtonWrapper>
                  <Button type={"submit"}>수정</Button>
                  <Button
                    type={"button"}
                    buttonType={"secondary"}
                    onClick={() => {
                      navigate(-2);
                    }}
                  >
                    취소
                  </Button>
                </ButtonWrapper>
              </InputContainer>
            </Form>
          </FormContainer>
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

const FormTitle = styled.h1`
  font-size: xx-large;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.BLACK};
`;

// const FormText = styled.p`
//   font-size: large;
// `;

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
  align-items: center;
  gap: 2rem;
`;

// const FlexRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   gap: 2rem;
// `;

// const Fieldset = styled.fieldset`
//   border: ${({ theme }) => theme.borders.containerBorder};
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   text-align: center;
//   gap: 2rem;
//   position: relative;
// `;

// const Legend = styled.legend`
//   position: absolute;
//   left: 1rem;
//   top: 50%; //수직 중앙
//   transform: translateY(-50%); //중앙정렬
//   font-size: small;
// `;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding-left: 3.5rem;
// `;

// const RadioInputWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 0.5rem;
//   label {
//     font-size: small;
//   }
// `;

export const Label = styled.label`
  /* height: 100%; */
  /* width: 100%; */
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  cursor: pointer;
`;

export const PreviewWrapper = styled.div`
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

export const HiddenInput = styled.input`
  display: none;
`;

//✅ 버튼

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  /* justify-content: center;
  align-items: center; */
  flex-direction: column;
  width: 70%;
  gap: 2rem;
`;
