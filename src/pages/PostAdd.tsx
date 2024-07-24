import Button from "@components/Button";
import ColorPickBar from "@components/ColorPickBar";
import Icon from "@components/Icon";
import Input from "@components/Input";
import Select from "@components/Select";
import SelectButton from "@components/SelectButton";
import SelectedTag from "@components/SelectedTag";
import Textarea from "@components/Textarea";
import {
  ButtonWrapper,
  HiddenInput,
  IconWrapper,
  Label,
  LeftWrapper,
  Preview,
  PreviewWrapper,
  RightWrapper,
  RowWrapper,
  SelectedTagContainer,
} from "@pages/ClosetAdd";
import { globalIcon, imageAddIcon, lockIcon } from "@shared/icons";
import { useRef, useState } from "react";
import styled from "styled-components";

export default function PostAdd() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("등록하기 버튼 클릭");
    console.log("공개/비공개 설정:", visibility);

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      //
    } //예외처리: 이미지파일 올려주세요
  };

  //✅ 라디오 버튼 클릭
  const [visibility, setVisibility] = useState<string>("public");

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value);
  };

  return (
    <Container>
      <TitleContainer>
        <Title>나의 OOTD</Title>
        <SubTitle>OOTD 등록하기</SubTitle>
      </TitleContainer>
      <Form onSubmit={handleSubmit}>
        <GridContainer>
          <Column>
            {/* / */}
            <LeftWrapper>
              <Label htmlFor="ootdImage">
                <PreviewWrapper>
                  {imageFile && <Preview src={imageFile} alt="preview" />}
                  {!imageFile && <IconWrapper>{imageAddIcon}</IconWrapper>}
                </PreviewWrapper>
              </Label>
              <HiddenInput
                type="file"
                accept="image/*"
                id="ootdImage"
                onChange={uploadImageFile}
                ref={imageRef}
              />
            </LeftWrapper>
            {/* / */}
          </Column>
          <Column>
            <MiddleWrapper>
              {/*  */}
              <Input label="제목" />
              <Textarea />
              {/*  */}
              {/*  */}
              <ButtonContainer>
                <HiddenRadio
                  type="radio"
                  id="public"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={handleVisibilityChange}
                />

                <RadioLabel htmlFor="public">
                  <Button
                    type="button"
                    buttonType="secondary"
                    icon={globalIcon}
                    htmlFor="public"
                    selected={visibility === "public"}
                  >
                    공개
                  </Button>
                </RadioLabel>
                <HiddenRadio
                  type="radio"
                  id="private"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={handleVisibilityChange}
                />
                <RadioLabel htmlFor="private">
                  <Button type="button" buttonType="secondary" icon={lockIcon}>
                    비공개
                  </Button>
                </RadioLabel>
              </ButtonContainer>
              {/*  */}
            </MiddleWrapper>
          </Column>
          <Column>
            {/* / */}
            <RightWrapper>
              <RowWrapper>
                <SelectButton selectedOption="위치" />
                <Select />
                <ColorPickBar />
                <SelectedTagContainer>
                  <SelectedTag color="sand" selectedTypeOption="티셔츠" />
                  <SelectedTag color="blue" selectedTypeOption="바지/청바지" />
                </SelectedTagContainer>
              </RowWrapper>
              <ButtonWrapper>
                <Button type="submit" buttonType="primary">
                  등록하기
                </Button>
              </ButtonWrapper>
            </RightWrapper>
            {/* / */}
          </Column>
        </GridContainer>
      </Form>
    </Container>
  );
}

//✅ 중간 레이아웃
const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const HiddenRadio = styled.input`
  display: none;
`;

const RadioLabel = styled.label`
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

//✅ 페이지 아웃라인
const Container = styled.div`
  height: calc(100vh - 7rem);
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem 4rem 4rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 2rem;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: x-large;
`;

const SubTitle = styled.div`
  font-size: large;
`;

const Form = styled.form`
  height: 100%;
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  /* border: 1px solid blue; */
`;
