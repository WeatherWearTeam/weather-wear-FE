import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Input from "@components/Input";
import SelectButton from "@components/SelectButton";
import { imageAddIcon, weatherSunCloudyIcon } from "@shared/icons";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function MyAccountEdit() {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const uploadImageFile = () => {
    if (imageRef.current && imageRef.current.files) {
      const file = imageRef.current.files[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImageFile(reader.result as string);
        };
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return console.log("회원 정보 수정 시작!");

    //폼 검증

    //폼 값 받기"

    //비동기 통신

    //폼 인풋 비우기

    //navigate /my
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
            <Form
              name="photo"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <ImageEditContainer>
                <Label htmlFor="clothesImage">
                  <PreviewWrapper>
                    {imageFile && <Preview src={imageFile} alt="preview" />}
                    {!imageFile && <Avatar size="xl" />}
                  </PreviewWrapper>
                </Label>
                <HiddenInput
                  name="image"
                  type="file"
                  accept="image/*"
                  id="clothesImage"
                  onChange={uploadImageFile}
                  ref={imageRef}
                />
              </ImageEditContainer>
              <InputContainer>
                <Input label="닉네임" type="text" />
                <SelectButton selectedOption="위치" />
                <Input label="비밀번호" type="password" />
                <Input label="비밀번호" type="password" />
                {/* <FlexRow>
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
              </FlexRow> */}
                <ButtonWrapper>
                  <Button type={"button"}>수정</Button>
                  <Button
                    buttonType={"secondary"}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    취소
                  </Button>
                </ButtonWrapper>
              </InputContainer>
            </Form>
            <LinkWrapper>
              더 이상 웨더웨어를 사용하고 싶지 않아요
              <LinkToLogin to={`/login`}>회원 탈퇴하기</LinkToLogin>
            </LinkWrapper>
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

// const Text = styled.div`
//   font-size: medium;
//   color: ${({ theme }) => theme.colors.gray};
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
  gap: 1rem;
`;

const FormTitle = styled.h1`
  font-size: xx-large;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.black};
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

//

const LinkWrapper = styled.div`
  font-size: small;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
`;
const LinkToLogin = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  font-size: small;
`;

//✅ 인풋

const ImageEditContainer = styled.div`
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
