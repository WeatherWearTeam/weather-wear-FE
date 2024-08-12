import { ClothesItemByIdResponse } from "@api/clothesApi";
import Button from "@components/Button";
import ColorPickBar from "@components/Color/ColorPickBar";
import Select from "@components/Select/Select";
import SelectedTag from "@components/Select/SelectedTag";
import clothesTypeList, {
  ClothesKoreanType,
  ClothesType,
} from "@shared/clothesTypeList";
import { ClothesColorType } from "@shared/colorTypeList";
import { imageAddIcon } from "@shared/icons";

import getKoreanType from "@utils/getKoreanType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

interface ClothesBoardData {
  color: ClothesColorType | null;
  type: ClothesType | null;
  typeKorean: ClothesKoreanType | "옷 종류" | null;
}

interface ClosetFormProps {
  data?: ClothesItemByIdResponse;
  isPending: boolean;
  isError: boolean;
  onUpdateClothes?: (updatedBoard: FormData) => void;
  onCreateClothes?: (newBoard: FormData) => void;
}

export default function ClosetForm({
  data,
  isPending,
  // isError,
  onUpdateClothes,
  onCreateClothes,
}: ClosetFormProps) {
  const navigate = useNavigate();
  /////////////////////////////////////////////////////////
  const [clothesBoardData, setClothesBoardData] = useState<ClothesBoardData>({
    color: null, // 초기값을 null로 설정
    type: null,
    typeKorean: "옷 종류", // 초기값을 null로 설정
  });

  const handleSelectType = (
    type: ClothesType,
    typeKorean: ClothesKoreanType
  ) => {
    setClothesBoardData((prev) => ({
      ...prev,
      type,
      typeKorean,
    }));
  };

  const handleSelectColor = (color: ClothesColorType) => {
    setClothesBoardData((prev) => ({
      ...prev,
      color,
    }));
  };

  const handleRemoveTag = () => {
    setClothesBoardData({
      color: null, // 초기값으로 설정
      type: null,
      typeKorean: "옷 종류", // 초기값으로 설정
    });
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
  // 🌟 FormData의 내용을 콘솔에 출력하는 함수
  function logFormData(formData: FormData) {
    for (const pair of formData.entries()) {
      // 'const' 사용
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  }

  //////////////////////////////////////////////////////////////
  //등록하기 버튼 클릭했을 때 실행하는 handleSubmit 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지

    //예외처리: 이미지파일이 안들어 왔다면 return
    if (!imageFile && !imageSrc) {
      alert("옷 사진을 선택해 주세요!");
      return;
    }

    if (clothesBoardData.typeKorean === "옷 종류") {
      alert("옷 종류를 선택해 주세요!");
      return;
    }

    if (clothesBoardData.color === null) {
      alert("옷 색깔을 선택해 주세요!");
      return;
    }

    if (
      data &&
      clothesBoardData.type === data.type &&
      clothesBoardData.color === data.color &&
      !imageFile
    ) {
      alert(
        "변경된 사항이 없습니다. 변경하실 사항이 없으면 취소를 버튼을 눌러 주세요."
      );
      return;
    }

    const formData = new FormData();
    formData.append("type", clothesBoardData.type as string);
    formData.append("color", clothesBoardData.color);

    if (data) {
      if (imageFile) {
        formData.append("file", imageFile as File);
        console.log("새로운 사진 선택함");
      } else {
        //파일 선택 안하면 빈값
        console.log("새로운 사진 선택 안함");
      }
    } else {
      // data가 없을 때
      formData.append("file", imageFile as File);
    }

    if (!data) {
      logFormData(formData); //로그찍기
      onCreateClothes?.(formData);
    } else {
      formData.append("id", data.id.toString());
      logFormData(formData); //로그찍기
      onUpdateClothes?.(formData);
    }
  };

  //////////////////////////////////////////////////////////////
  useEffect(() => {
    if (data) {
      console.log(data);
      setClothesBoardData((prev) => ({
        ...prev,
        color: data.color,
        type: data.type,
        typeKorean: getKoreanType(data.type),
      }));

      setImageSrc(data.image);
    }
  }, [data]);

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

  return (
    <MyPageContentsContainer>
      <Container>
        <TitleContainer>
          <Title>내 옷장</Title>
          <SubTitle>{data ? `옷 수정하기` : `옷 등록하기`}</SubTitle>
        </TitleContainer>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  <Select
                    list={clothesTypeList}
                    onClick={handleSelectType}
                    value={clothesBoardData.typeKorean}
                  />
                  <ColorPickBar
                    onClick={handleSelectColor}
                    selectedColor={clothesBoardData.color!}
                  />
                  <SelectedTagContainer>
                    {clothesBoardData.color && clothesBoardData.type ? (
                      <SelectedTag
                        id={Date.now()}
                        color={clothesBoardData.color}
                        selectedTypeOption={clothesBoardData.typeKorean}
                        onRemoveTag={handleRemoveTag}
                      />
                    ) : null}
                  </SelectedTagContainer>
                </RowWrapper>
                <ButtonWrapper>
                  <Button
                    type="submit"
                    buttonType="primary"
                    disabled={isPending}
                  >
                    {data ? `수정하기` : `등록하기`}
                  </Button>
                  <Button
                    type="button"
                    buttonType="secondary"
                    disabled={isPending}
                    onClick={() => navigate(-1)}
                  >
                    취소
                  </Button>
                </ButtonWrapper>
              </RightWrapper>
              {/* / */}
            </Column>
          </GridContainer>
        </Form>
      </Container>
    </MyPageContentsContainer>
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
  min-height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  width: 10rem;
  height: 10rem;
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
  gap: 2rem;
`;

//✅ 페이지 아웃라인

const MyPageContentsContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  height: calc(100vh - 6rem);
  position: fixed;
  top: 6rem; //픽스 위치 조정
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 0 2rem; */
`;

const Container = styled.div`
  max-width: 1040px; //✅에라이
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem 4rem 4rem;
  /* background-color: blue; */
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.BLACK};
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
  /* background-color: red; */
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  /* @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  } */
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  /* border: 1px solid blue; */
`;
