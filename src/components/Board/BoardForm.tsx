import Button from "@components/Button";
import ColorPickBar from "@components/Color/ColorPickBar";
// import Icon from "@components/Icon";
import Input from "@components/Input";
import Select from "@components/Select/Select";
import SelectButton from "@components/Select/SelectButton";
import SelectedTag from "@components/Select/SelectedTag";
import Textarea from "@components/Textarea";
import clothesTypeList from "@shared/clothesTypeList";
import { globalIcon, imageAddIcon, lockIcon } from "@shared/icons";
import useClothesTagStore, {
  ClothesColorType,
  ClothesType,
} from "@store/clothesTagStore";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

interface BoardTagType {
  id: number;
  type: ClothesType | "옷 종류";
  color: ClothesColorType | "";
}

export interface BoardDataType {
  userId: number;
  title: string;
  contents: string;
  isPrivate: boolean;
  stn: number;
  address: string;
  boardTags: BoardTagType[];
}

/////////////////////

interface BoardFormProps {
  data?: BoardDataType;
  isPending: boolean;
  isError: boolean;
  onUpdateBoard?: (updatedBoard: BoardDataType) => void;
  onCreateBoard?: (newBoard: Omit<BoardDataType, "id">) => void;
}

export default function BoardForm({
  data,
  isPending,
  isError,
  onUpdateBoard,
  onCreateBoard,
}: BoardFormProps) {
  const navigate = useNavigate();
  /////////////////////////////////////////////////////////
  //이미지 제외 데이터 모음
  const [boardData, setBoardData] = useState<BoardDataType>(
    data
      ? data
      : {
          userId: 1,
          title: "",
          contents: "",
          isPrivate: false,
          stn: 1,
          address: "",
          boardTags: [
            // {
            //   id: 0,
            //   type: "옷 종류", // 초기값으로 설정
            //   color: "", // 빈 문자열로 설정
            // },
          ],
        }
  );
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

  const handleAddTag = useCallback(
    (newTag: BoardTagType) => {
      addTag(newTag);
      setBoardData((prev) => ({
        ...prev,
        boardTags: [...prev.boardTags, newTag],
      }));
    },
    [addTag]
  );

  const handleRemoveTag = useCallback(
    (tagId: number) => {
      removeTag(tagId);
      setBoardData((prev) => ({
        ...prev,
        boardTags: prev.boardTags.filter((tag) => tag.id !== tagId),
      }));
    },
    [removeTag]
  );

  // 선택한 타입과 색상이 모두 있을 때 태그 추가
  useEffect(() => {
    setIsSingleTag(false);
    if (selectedType !== "옷 종류" && selectedColor) {
      const newTag = {
        id: Number(new Date().getTime()),
        type: selectedType,
        color: selectedColor,
      };

      handleAddTag(newTag);
    }
  }, [selectedType, selectedColor, handleAddTag, setIsSingleTag]);

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
  // 라디오 버튼 클릭
  const [visibility, setVisibility] = useState<string>("public");

  const handleVisibilityClick = (value: string) => {
    setVisibility(value);

    if (value === "public") {
      setBoardData((prev) => ({ ...prev, isPrivate: false }));
    } else if (value === "private") {
      setBoardData((prev) => ({ ...prev, isPrivate: true }));
    }
  };

  //////////////////////////////////////////////////////////////
  //인풋 변경
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBoardData((prev) => ({ ...prev, [name]: value }));
  };

  //////////////////////////////////////////////////////////////
  //등록하기 버튼 클릭했을 때 실행하는 handleSubmit 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지

    console.log("💕💕💕", boardData);

    //🌟🌟🌟🌟🌟 예외처리 하는 로직 작성 🌟🌟🌟🌟🌟

    //예외처리: 이미지파일이 안들어 왔다면 return
    if (!imageFile || !data?.boardImage?.image) {
      return alert("사진을 선택해 주세요!");
    }

    if (!boardData.title.trim()) {
      // dispatch(
      //   setAlert({
      //     formId,
      //     message: "제목과 내용을 모두 입력해 주세요!",
      //   })
      // );
      alert("제목을 입력해 주세요!");
      return;
    }

    if (!boardData.contents.trim()) {
      alert("내용을 입력해 주세요!");
      return;
    }
    //예외처리:옷 종류-컬러 1세트 없으면 return
    if (boardData.boardTags.length < 1) {
      return alert("옷 종류와 색상을 선택해 주세요!");
    }

    return console.log(boardData);
    //폼 데이터 제출하는 로직 짜기
    // const formData = new FormData();
    // formData.append("boardData", JSON.stringify(boardData));
    // formData.append("image", imageFile);

    const newBoard: Omit<BoardDataType, "id"> = {
      ...boardData,
      // image: imageFile ? URL.createObjectURL(imageFile) : "default-image-url",
      image:
        "https://image.msscdn.net/images/plan_top_img/2024072610003600000024001.jpg",
    };

    //mutateCreateBoard

    if (!data) {
      //투두 생성
      onCreateBoard?.(newBoard);
    } else {
      //투두 수정
      const updatedBoard: BoardDataType = {
        ...data,
        ...newBoard, // 수정된 부분만
      };
      onUpdateBoard?.(updatedBoard);
    }

    //상태 리셋하기
    resetTag(); //태그
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
  //에딧 페이지인 경우 데이터 채워 넣기

  useEffect(() => {
    if (data) {
      setBoardData((prev) => ({
        ...prev,
        boardTags: data.boardTags,
      }));

      setImageSrc(data.boardImage?.image);

      // 전역 상태 초기화
      resetTag();

      // 전역 상태 업데이트
      const initialTags = data.boardTags.map((tag) => ({
        id: tag.id,
        type: tag.type,
        color: tag.color,
      }));

      initialTags.forEach((tag) => {
        addTag(tag);
      });
    }
  }, [data, addTag, resetTag]);
  //////////////////////////////////////////////////////////////

  return (
    <Container>
      <TitleContainer>
        <Title>나의 OOTD</Title>
        <SubTitle>{data ? `OOTD 수정하기` : `OOTD 등록하기`}</SubTitle>
      </TitleContainer>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <GridContainer>
          <Column>
            {/* / */}
            <LeftWrapper>
              <Label htmlFor="ootdImage">
                <PreviewWrapper>
                  {imageSrc && <Preview src={imageSrc} alt="preview" />}
                  <IconWrapper>{imageAddIcon}</IconWrapper>
                </PreviewWrapper>
              </Label>
              <HiddenInput
                type="file"
                accept="image/*"
                id="ootdImage"
                onChange={uploadImageFile}
              />
            </LeftWrapper>
            {/* / */}
          </Column>
          <Column>
            <MiddleWrapper>
              {/*  */}
              <ButtonContainer>
                <HiddenRadio
                  type="radio"
                  id="public"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={(e) => handleVisibilityClick(e.target.value)}
                />

                <RadioLabel htmlFor="public">
                  <Button
                    type="button"
                    buttonType="secondary"
                    icon={globalIcon}
                    htmlFor="public"
                    selected={visibility === "public"}
                    onClick={() => handleVisibilityClick("public")} // 버튼 클릭 시 상태 변경
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
                  onChange={(e) => handleVisibilityClick(e.target.value)}
                />
                <RadioLabel htmlFor="private">
                  <Button
                    type="button"
                    buttonType="secondary"
                    icon={lockIcon}
                    htmlFor="private"
                    selected={visibility === "private"}
                    onClick={() => handleVisibilityClick("private")} // 버튼 클릭 시 상태 변경
                  >
                    비공개
                  </Button>
                </RadioLabel>
              </ButtonContainer>
              {/*  */}
              {/*  */}
              <Input
                label="제목"
                name="title"
                type="text"
                onChange={handleChange}
                value={boardData.title}
              />
              <Textarea onChange={handleChange} value={boardData.contents} />
              {/*  */}
            </MiddleWrapper>
          </Column>
          <Column>
            {/* / */}
            <RightWrapper>
              <RowWrapper>
                <SelectButton selectedOption="위치" />
                <Select
                  list={clothesTypeList}
                  onClick={handleSelectedType}
                  value={selectedType}
                />
                <ColorPickBar onClick={handleSelectedColor} />
                <SelectedTagContainer>
                  {boardData.boardTags.map((tag) => (
                    <SelectedTag
                      key={tag.id}
                      id={tag.id}
                      color={tag.color}
                      selectedTypeOption={tag.type}
                      onRemoveTag={handleRemoveTag}
                    />
                  ))}
                </SelectedTagContainer>
              </RowWrapper>
              <ButtonWrapper>
                <Button type="submit" buttonType="primary" disabled={isPending}>
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
  );
}

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

//

const Form = styled.form`
  height: 100%;
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

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

const Column = styled.div`
  /* border: 1px solid blue; */
`;

//🌈ClosetAdd 랑 같은 부분

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
  max-height: 60rem;
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
