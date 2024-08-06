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
import { useParams, useNavigate } from "react-router-dom";
import { getClothesItemById, updateClothesItem } from "@api/clothesApi";

export default function ClosetEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // 초기 상태 설정 수정
  const [selectedType, setSelectedType] = useState<ClothesType | null>(null);
  const [selectedColor, setSelectedColor] = useState<ClothesColorType | null>(null);

  const {
    newTagList,
    addTag,
    removeTag,
    resetTag,
  } = useClothesTagStore();

  // 데이터 로드
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await getClothesItemById(Number(id));
        setSelectedType(item.type as ClothesType);
        setSelectedColor(item.color as ClothesColorType);
        setImageSrc(item.image);

        // 태그 초기화 및 추가
        resetTag();
        addTag({
          id: item.id,
          type: item.type as ClothesType,
          color: item.color as ClothesColorType,
        });
      } catch (error) {
        console.error("Failed to load item", error);
      }
    };

    fetchItem();
  }, [id, addTag, resetTag]);

  // selectedType과 selectedColor가 변경될 때마다 newTagList 업데이트
  useEffect(() => {
    if (selectedType && selectedColor) {
      resetTag();
      addTag({
        id: Number(new Date().getTime()),
        type: selectedType,
        color: selectedColor,
      });
    }
  }, [selectedType, selectedColor, addTag, resetTag]);
  
  useEffect(() => {
    console.log("New Tag List updated:", newTagList);
  }, [newTagList]);

  useEffect(() => {
    console.log("Selected Type:", selectedType);
    console.log("Selected Color:", selectedColor);
    console.log("New Tag List:", newTagList);
  }, [selectedType, selectedColor, newTagList]);

  const handleSelectedType = (type: ClothesType) => {
    console.log("Selected Type:", type);
    setSelectedType(type);
  };

  const handleSelectedColor = (color: ClothesColorType) => {
    console.log("Selected Color:", color);
    setSelectedColor(color);
  };

  const uploadImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImageSrc(previewUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageSrc) {
      alert("이미지 파일을 선택해주세요.");
      return;
    }

    if (newTagList.length === 0) {
      alert("옷 종류와 색상을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("type", newTagList[0].type);
    formData.append("color", newTagList[0].color);

    // console.log("Submitting data:");
    // console.log("Type:", newTagList[0].type);
    // console.log("Color:", newTagList[0].color);
    // console.log("Image File:", imageFile);

    updateClothesItem(Number(id), formData)
      .then(() => {
        alert("옷이 성공적으로 수정되었습니다.");
        navigate("/mypage/closet");
      })
      .catch((error) => {
        alert("옷 수정에 실패했습니다. 다시 시도해주세요.");
        console.error(error);
      });
  };

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  return (
    <Container>
      <TitleContainer>
        <Title>내 옷장</Title>
        <SubTitle>옷 수정하기</SubTitle>
      </TitleContainer>
      <Form onSubmit={handleSubmit}>
        <GridContainer>
          <Column>
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
          </Column>
          <Column>
            <RightWrapper>
              <RowWrapper>
                <Select onClick={handleSelectedType} value={selectedType} />
                <ColorPickBar onClick={handleSelectedColor} selectedColor={selectedColor} />
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
                  수정하기
                </Button>
              </ButtonWrapper>
            </RightWrapper>
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
