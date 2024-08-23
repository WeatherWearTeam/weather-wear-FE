import AlertText from "@components/AlertText";
import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Input from "@components/Input";
import useError from "@hooks/useError";
import useAuth from "@queries/useAuth";
import { useDeleteUser, useMe, useUpdateUser } from "@queries/userQueries";
import { imageAddIcon, weatherSunCloudyIcon } from "@shared/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

export default function MyAccountEdit() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { me } = useMe(isLoggedIn);
  const { errorMessage, alertErrorMessage, deleteErrorMessage } = useError();

  /////////////////////////////////////////////////////
  //회원 탈퇴
  const { mutateDeleteUser } = useDeleteUser();
  const handleDeleteUser = () => {
    const isConfirmed = confirm(
      "정말 탈퇴하시겠습니까? 모든 회원 정보는 복구할 수 없습니다."
    );

    if (isConfirmed) {
      // mutateLogout(); //로그아웃
      mutateDeleteUser(); //유저 정보 디비에서 삭제
    }
  };

  /////////////////////////////////////////////////////
  //회원 업데이트
  const { mutateUpdateUser } = useUpdateUser();

  const [userNickname, setUserNickname] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    deleteErrorMessage();
    setUserNickname(e.target.value);
  };

  //파일 선택 및 프리뷰 보기
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null); //임시 url 만들기(string 타입으로 src에 넣기 위함)

  const uploadImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImageSrc(previewUrl);
    }
  };

  //사용자가 이미지 프리뷰/기존 이미지/파일도 안올리고 싶은 경우
  const handleDeleteImage = () => {
    setImageSrc(null);
    setImageFile(null);
  };

  // 🌟 FormData의 내용을 콘솔에 출력하는 함수
  // function logFormData(formData: FormData) {
  //   for (const pair of formData.entries()) {
  //     // 'const' 사용
  //     console.log(`${pair[0]}: ${pair[1]}`);
  //   }
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (me) {
      if (!userNickname.trim()) {
        return alertErrorMessage("닉네임을 입력해 주세요!");
      }

      if (
        userNickname === me.nickname &&
        !imageFile &&
        imageSrc === me?.image
      ) {
        return alertErrorMessage(
          "변경된 사항이 없습니다. 변경하실 사항이 없으면 취소를 버튼을 눌러 주세요."
        );
      }

      // return console.log(
      //   "userNickname",
      //   userNickname,
      //   "imageFile",
      //   imageFile,
      //   "imageSrc",
      //   imageSrc
      // );

      // const jsonPayloadNickname = JSON.stringify({
      //   nickname: userNickname,
      // });
      // const jsonPayloadImageUrl = JSON.stringify({
      //   url: me.image === null ? null : me.image,
      // });

      // return console.log(imageSrc, imageFile, me.image);

      // formData.append("nickname", jsonPayloadNickname);
      // formData.append("url", jsonPayloadImageUrl);

      // if (imageFile) {
      //   formData.append("file", imageFile);
      // }
      //폼 데이터 제출하는 로직 짜기
      const formData = new FormData();

      // 닉네임은 변경하든 말든 그냥 다 보냄
      formData.append("nickname", userNickname);

      //기존 이미지 없는 경우
      if (me.image === null) {
        // formData.append("url", "");

        if (imageFile) {
          //새 파일 있는 경우
          formData.append("deleteImage", "false");
          formData.append("file", imageFile);
        } else {
          //새 파일 없는 경우
          formData.append("deleteImage", "false");
          formData.append(
            "file",
            new Blob([], { type: "application/octet-stream" }) //빈 블롭 객체 보내서 File 타입 유지
          );
        }
      } else {
        //기존 이미지 있는 경우
        // formData.append("url", me.image as string);
        if (imageFile) {
          //새 파일 올림
          formData.append("deleteImage", "true");
          formData.append("file", imageFile);
        } else if (Boolean(!imageFile) && Boolean(!imageSrc)) {
          formData.append("deleteImage", "true");
          formData.append(
            "file",
            new Blob([], { type: "application/octet-stream" }) //빈 블롭 객체 보내서 File 타입 유지
          );
        } else {
          //새 파일 안올림 && 기존 이미지도 X인 경우
          formData.append("deleteImage", "false");
          formData.append(
            "file",
            new Blob([], { type: "application/octet-stream" }) //빈 블롭 객체 보내서 File 타입 유지
          );
        }
      }

      // logFormData(formData);

      mutateUpdateUser(formData);
    }
  };

  // useEffect로 내 정보 먼저 가져와서 폼 채우기
  useEffect(() => {
    if (me) {
      setUserNickname(me.nickname);
      if (me.image) {
        setImageSrc(me.image);
      }
    }
  }, [me]);

  //////////////////////////////////////////////////////////////
  useEffect(() => {
    //클린업 펑션
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  //////////////////////////////////////////////////////////////

  return (
    <Container>
      <GridContainer>
        <LeftColumn>
          <BackgroundSunWrapper>
            <Circle />
          </BackgroundSunWrapper>
          <TextContainer>
            <Title>내 계정</Title>
          </TextContainer>
          <BackgroundCloudWrapper>
            {weatherSunCloudyIcon}
          </BackgroundCloudWrapper>
        </LeftColumn>
        <RightColumn>
          <FormTextContainer>
            <FormTitle>회원 정보 수정</FormTitle>
          </FormTextContainer>
          <FormContainer>
            <Form
              name="photo"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <ImageEditContainer>
                <Label htmlFor="userImage">
                  <PreviewWrapper>
                    <Avatar size="xl" image={imageSrc} />
                    <IconWrapper>{imageAddIcon}</IconWrapper>
                  </PreviewWrapper>
                </Label>
                <HiddenInput
                  name="image"
                  type="file"
                  accept="image/*"
                  id="userImage"
                  onChange={uploadImageFile}
                />
                <ImageDeleteButtonWrapper>
                  <Button
                    type="button"
                    buttonType="secondary"
                    onClick={handleDeleteImage}
                    disabled={Boolean(!imageSrc)}
                  >
                    사진 삭제
                  </Button>
                </ImageDeleteButtonWrapper>
              </ImageEditContainer>

              <InputContainer>
                <Input
                  label="닉네임"
                  type="text"
                  name={"nickname"}
                  value={userNickname}
                  onChange={handleChange}
                />
                <ButtonWrapper>
                  <Button type={"submit"}>수정</Button>
                  <Button
                    type={"button"}
                    buttonType={"secondary"}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    취소
                  </Button>
                </ButtonWrapper>
                <AlertText>
                  {
                    errorMessage
                    // ||
                    //   (isErrorLogin &&
                    //     (errorLogin?.response?.data as { message: string })
                    //       ?.message)
                  }
                </AlertText>
              </InputContainer>
            </Form>
            <LinkContainer>
              <LinkWrapper>
                <LinkToPassEdit to={`/my/setting/password`}>
                  비밀번호 변경하기
                </LinkToPassEdit>
              </LinkWrapper>
              <LinkWrapper>
                더 이상 웨더웨어를 사용하고 싶지 않아요
                <LinkToDeleteUser onClick={handleDeleteUser}>
                  회원 탈퇴하기
                </LinkToDeleteUser>
              </LinkWrapper>
            </LinkContainer>
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: 100%;
`;

//📝 폼
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  width: 70%;

  @media (max-width: 1200px) {
    gap: 3rem;
  }
`;
const LinkWrapper = styled.div`
  font-size: small;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;
const LinkToPassEdit = styled(Link)`
  color: ${({ theme }) => theme.colors.BLUE};
  font-size: small;
`;

const LinkToDeleteUser = styled.div`
  color: ${({ theme }) => theme.colors.BLUE};
  font-size: small;
  cursor: pointer;
`;
//✅ 인풋

const ImageEditContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100%;
  width: 100%;
`;

export const Label = styled.label`
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

export const IconWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  width: 7rem;
  height: 7rem;
  color: ${({ theme }) => css`
    ${theme.colors.main}66; //투명도 40%
  `};
  transition: color 0.25s linear;

  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

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

const ImageDeleteButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 8rem;
  gap: 2rem;
  button {
    &:disabled {
      &:hover,
      &:focus {
        border: ${({ theme }) => theme.borders.containerBorder};
        color: ${({ theme }) => theme.colors.main};
      }
    }
  }
`;

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
