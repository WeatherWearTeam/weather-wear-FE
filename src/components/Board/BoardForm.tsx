import { BoardByIdResponse } from "@api/boardApi";
import Button from "@components/Button";
import ColorPickBar from "@components/Color/ColorPickBar";
import Input from "@components/Input";
import Select from "@components/Select/Select";
import SelectedTag from "@components/Select/SelectedTag";
import Textarea from "@components/Textarea";
import MapSelector, { AddressInfo } from "@components/Weather/MapSelector";
import useModal from "@hooks/useModal";
import clothesTypeList, {
  ClothesKoreanType,
  ClothesType,
} from "@shared/clothesTypeList";
import { ClothesColorType } from "@shared/colorTypeList";
import { globalIcon, imageAddIcon, lockIcon } from "@shared/icons";
import getKoreanType from "@utils/getKoreanType";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

interface ClothesTypeData {
  id: number;
  color: ClothesColorType | null;
  type: ClothesType | null;
  typeKorean: ClothesKoreanType | "옷 종류" | null;
}

interface ClothesTypeWithoutIdAndTypeKorean {
  color: ClothesColorType;
  type: ClothesType;
}

export interface BoardDataType {
  title: string;
  contents: string;
  isPrivate: boolean;
  addressId: number;
  address: string;
  tags: ClothesTypeData[];
}

/////////////////////

interface BoardFormProps {
  data?: BoardByIdResponse;
  isPending: boolean;
  isError: boolean;
  onUpdateBoard?: (updatedBoard: FormData) => void;
  onCreateBoard?: (newBoard: FormData) => void;
}

export default function BoardForm({
  data,
  isPending,
  isError,
  onUpdateBoard,
  onCreateBoard,
}: BoardFormProps) {
  const navigate = useNavigate();
  const { openModal, closeModal, isVisible } = useModal();
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);

  const getAddressCode = useCallback((info: AddressInfo) => {
    setAddressInfo(info);
  }, []); //컴포넌트가 마운트될 때만 함수를 생성

  /////////////////////////////////////////////////////////
  const [clothesBoardData, setClothesBoardData] = useState<ClothesTypeData>({
    id: 0, //초기값 0
    color: null, // 초기값을 null로 설정
    type: null,
    typeKorean: "옷 종류",
  });

  /////////////////////////////////////////////////////////
  //이미지 제외 데이터 모음
  const [boardData, setBoardData] = useState<BoardDataType>({
    title: "",
    contents: "",
    isPrivate: false,
    addressId: 0,
    address: "",
    tags: [],
    // views: 0 // 초기값 세팅이 여기서 필요한지?
  });
  //////////////////////////////////////////////////////////////

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

  const addTag = useCallback(
    (data: ClothesTypeData) => {
      if (boardData.tags.length >= 5) {
        alert("태그는 최대 5개까지만 추가할 수 있습니다!");
        return;
      }

      const newClothes: ClothesTypeData = {
        ...data,
        id: Date.now(), //삭제할 때 id 값 필요하기 때문에 현재 시간 값으로 id 생성
      };

      //새로 추가된 컬러-타입 boardData.tags 배열에 넣어 업데이트하기
      setBoardData((prev) => ({
        ...prev,
        tags: [...prev.tags, newClothes],
      }));

      //그러고 나서 clothesBoardData 상태는 초기화해야 새로 컬러-종류 선택할 때 오류 안남
      setClothesBoardData({
        id: 0,
        color: null,
        type: null,
        typeKorean: "옷 종류",
      });
    },
    [boardData.tags.length]
  );

  const handleRemoveTag = (tagId: number) => {
    setBoardData((prev) => ({
      ...prev,
      tags: prev.tags.filter((item) => item.id !== tagId),
    }));
  };

  // useEffect를 사용하여 clothesBoardData가 업데이트되면 태그 추가하기
  useEffect(() => {
    //컬러-타입 한 세트이기 때문에 이렇게 하나씩 추가해야 ㅇㅇ..
    if (clothesBoardData.type && clothesBoardData.color) {
      addTag(clothesBoardData);
    }
  }, [clothesBoardData, addTag]);

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

    console.log("💕💕💕", boardData);
    console.log("💕파일💕", imageFile);
    console.log("💕프리뷰src💕", imageSrc);

    //🌟🌟🌟🌟🌟 예외처리 하는 로직 작성 🌟🌟🌟🌟🌟

    //예외처리: 이미지파일이 안들어 왔다면 return
    if (!imageSrc) {
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
    if (boardData.tags.length < 1) {
      return alert("옷 종류와 색상을 선택해 주세요!");
    }
    // return console.log(boardData);

    //폼 보내기 전에 아이디 없애기
    // const tagsWithoutId = boardData.tags.map(
    //   ({ id, typeKorean, ...rest }) => rest
    // );
    //비구조화 할당.. 에스린트 오류 뜸 ㅠㅠ

    //타입명시하고 null 없애고 고고!
    const tagsWithoutIdAndTypeKorean: ClothesTypeWithoutIdAndTypeKorean[] =
      boardData.tags.map((tag) => ({
        color: tag.color as ClothesColorType,
        type: tag.type as ClothesType,
      }));

    // return console.log(boardData);
    //폼 데이터 제출하는 로직 짜기

    // return console.log(tagsWithoutIdAndTypeKorean)

    const formData = new FormData();

    if (imageFile && imageSrc) {
      formData.append("file", imageFile);
    } else {
      null;
    }

    if (!data) {
      const newJsonData = {
        title: boardData.title,
        contents: boardData.contents,
        isPrivate: boardData.isPrivate,
        addressId: boardData.addressId,
        address: boardData.address,
        tags: tagsWithoutIdAndTypeKorean,
      };

      formData.append(
        "data",
        new Blob([JSON.stringify(newJsonData)], {
          type: "application/json",
        })
      );

      logFormData(formData); //로그찍기
      onCreateBoard?.(formData);
    } else {
      const updatedJsonData = {
        id: data.id,
        title: boardData.title,
        contents: boardData.contents,
        isPrivate: boardData.isPrivate,
        addressId: boardData.addressId,
        address: boardData.address,
        tags: tagsWithoutIdAndTypeKorean,
      };

      formData.append(
        "data",
        new Blob([JSON.stringify(updatedJsonData)], {
          type: "application/json",
        })
      );

      logFormData(formData); //로그찍기
      onUpdateBoard?.(formData);
    }
  };

  //////////////////////////////////////////////////////////////
  // formData.append("title", boardData.title);
  // formData.append("contents", boardData.contents);
  // formData.append("isPrivate", String(boardData.isPrivate));
  // formData.append("addressId", String(boardData.addressId));
  // formData.append("address", boardData.address);
  // formData.append("tags", JSON.stringify(tagsWithoutId)); // tags를 JSON 문자열로 변환하여 추가
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
        title: data.title,
        contents: data.contents,
        isPrivate: data.isPrivate,
        addressId: data.weather.addressId,
        address: data.address,
        tags: data.tags.map((tag, index) => ({
          id: Date.now() + index * 5, //임의 값 생성 + (index값 * 5) 줘서 좀더 안전빵으로 고
          type: tag.type,
          color: tag.color,
          typeKorean: getKoreanType(tag.type),
        })),
      }));

      setImageSrc(data.image);

      // // 전역 상태 업데이트
      // const initialTags = data.boardTags.map((tag) => ({
      //   id: tag.id,
      //   type: tag.type,
      //   color: tag.color,
      // }));

      // initialTags.forEach((tag) => {
      //   addTag(tag);
      // });
    }
  }, [data]);

  //////////////////////////////////////////////////////////////

  useEffect(() => {
    if (addressInfo) {
      setBoardData((prev) => ({
        ...prev,
        address: addressInfo.address,
        addressId: Number(addressInfo.code),
      }));
    }
  }, [addressInfo]);
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
                <MapWrapper>
                  <div>위치</div>
                  <MapSelector
                    onClick={() => openModal()}
                    closeModal={closeModal}
                    isVisible={isVisible}
                    onGetAddressCode={getAddressCode}
                  />
                </MapWrapper>
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
                  {boardData.tags.map((item) => (
                    <SelectedTag
                      key={item.id}
                      id={item.id}
                      color={item.color}
                      selectedTypeOption={item.typeKorean}
                      onRemoveTag={() => handleRemoveTag(item.id)}
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

export const MapWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
  font-size: small;
  padding: 1.5rem 1.5rem;
  border: ${({ theme }) => theme.borders.containerBorder};
  transition: border linear 0.25s;
  div {
    padding: 0;
    font-size: small;
  }

  &:hover,
  &:focus,
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.colors.BLACK};
  }
`;

export const SelectedTagContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.borderLightGray};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;
