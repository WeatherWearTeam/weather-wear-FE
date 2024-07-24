import Button from "@components/Button";
import ColorBar from "@components/ColorBar";
import ColorPickBar from "@components/ColorPickBar";
import Select from "@components/Select";
import SelectButton from "@components/SelectButton";
import SelectedTag from "@components/SelectedTag";
import { imageAddIcon } from "@shared/icons";
import { useRef, useState } from "react";
import styled from "styled-components";

export default function ClosetAdd() {
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

    console.log("등록하기");

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      //
    } //예외처리: 이미지파일 올려주세요
  };

  return (
    <Container>
      <TitleContainer>
        <Title>내 옷장</Title>
        <SubTitle>옷 등록하기</SubTitle>
      </TitleContainer>
      <Form onSubmit={handleSubmit}>
        <GridContainer>
          <Column>
            {/* / */}
            <LeftWrapper>
              <Label htmlFor="clothesImage">
                <PreviewWrapper>
                  {imageFile && <Preview src={imageFile} alt="preview" />}
                  {!imageFile && <IconWrapper>{imageAddIcon}</IconWrapper>}
                </PreviewWrapper>
              </Label>
              <HiddenInput
                type="file"
                accept="image/*"
                id="clothesImage"
                onChange={uploadImageFile}
                ref={imageRef}
              />
            </LeftWrapper>
            {/* / */}
          </Column>
          <Column>
            {/* / */}
            <RightWrapper>
              <RowWrapper>
                <Select />
                <ColorPickBar />
                <SelectedTagContainer>
                  <SelectedTag color="sand" selectedTypeOption="티셔츠" />
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

//✅ 왼쪽 레이아웃

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  border: ${({ theme }) => theme.borders.containerBorder};
`;

export const Label = styled.label`
  height: 100%;
  width: 100%;
`;

export const PreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  width: 30%;
  color: ${({ theme }) => theme.colors.borderLightGray};
  transition: color 0.25s linear;

  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

export const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HiddenInput = styled.input`
  display: none;
`;

//✅ 오른쪽 레이아웃

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 2rem;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SelectedTagContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.borderLightGray};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  /* @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  } */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  /* border: 1px solid blue; */
`;
