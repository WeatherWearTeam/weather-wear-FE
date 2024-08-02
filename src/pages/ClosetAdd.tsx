import Button from "@components/Button";
import ColorPickBar from "@components/ColorPickBar";
import Select from "@components/Select";
import SelectedTag from "@components/SelectedTag";
import { imageAddIcon } from "@shared/icons";
import useClothesTagStore, {
  ClothesColorType,
  ClothesType,
} from "@store/clothesTagStore";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

export default function ClosetAdd() {
  //////////////////////////////////////////////////////////////
  // zustand 사용해 옷 타입, 컬러 태그 선택 관리 > 전역으로 관리
  const {
    selectedType,
    selectedColor,
    newTagList,
    setSelectedType,
    setSelectedColor,
    setIsSingleTag,
    addTag,
    removeTag,
    resetTag,
  } = useClothesTagStore();

  // 선택한 타입과 색상이 모두 있을 때 태그 추가
  useEffect(() => {
    setIsSingleTag(true);
    if (selectedType !== "옷 종류" && selectedColor) {
      addTag({
        id: Number(new Date().getTime()),
        type: selectedType,
        color: selectedColor,
      });
    }
  }, [selectedType, selectedColor, addTag, setIsSingleTag]);

  const handleSelectedType = (type: ClothesType) => {
    setSelectedType(type);
  };

  const handleSelectedColor = (color: ClothesColorType) => {
    setSelectedColor(color);
  };

  //////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////
  //등록하기 버튼 클릭했을 때 실행하는 handleSubmit 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지

    //🌟 예외처리 하는 로직 작성
    //예외처리: 이미지파일이 안들어 왔다면 return
    //예외처리:옷 종류-컬러 1세트 없으면 return

    //🌟 폼 데이터 제출하는 로직 짜기
    //이미지
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
    }

    // 🌟 mutateCreateClothes로 요청 보내기

    //상태 리셋하기
    resetTag();
  };

  //////////////////////////////////////////////////////////////
  // imageSrc 상태 변하면 프리뷰 세팅
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
                  {imageSrc && <Preview src={imageSrc} alt="preview" />}
                  <IconWrapper>{imageAddIcon}</IconWrapper>
                </PreviewWrapper>
              </Label>
              <HiddenInput
                type="file"
                accept="image/*"
                id="clothesImage"
                onChange={uploadImageFile}
              />
            </LeftWrapper>
            {/* / */}
          </Column>
          <Column>
            {/* / */}
            <RightWrapper>
              <RowWrapper>
                <Select onClick={handleSelectedType} value={selectedType} />
                <ColorPickBar onClick={handleSelectedColor} />
                <SelectedTagContainer>
                  {newTagList.map((tag) => (
                    <SelectedTag
                      key={tag.id}
                      id={tag.id}
                      color={tag.color}
                      selectedTypeOption={tag.type}
                      onRemoveTag={removeTag}
                    />
                  ))}
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
  position: absolute;
  cursor: pointer;
  width: 10rem;
  color: ${({ theme }) => css`
    ${theme.colors.main}66; //투명도 40%
  `};
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
