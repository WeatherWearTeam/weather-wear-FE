import ClothesTag from "@components/clothes/ClothesTag";
import Comments from "@components/Comment/Comments";
import EditIcon from "@components/EditIcon";
import Icon from "@components/Icon";
import {
  atIcon,
  ellipsisIcon,
  eyeIcon,
  eyeOffIcon,
  heartFillIcon,
  heartIcon,
  weatherSunIcon,
} from "@shared/icons";
import styled from "styled-components";

export default function PostDetail() {
  //임의
  const isPublic = true;
  const isClickedLike = false;

  return (
    <Container>
      <TitleContainer>
        {/* <Title>나의 OOTD</Title> */}
        <SubTitle>OOTD</SubTitle>
      </TitleContainer>
      <GridContainer>
        <Column>
          <ImageWrapper>
            <img
              src="https://image.msscdn.net/images/goods_img/20240705/4234925/4234925_17205047158757_500.jpg"
              alt="ootd사진"
            />
            {/* 이미지 로드 실패 시 예외 처리 필요 */}
          </ImageWrapper>
          {/*  */}
          <FlexRowIconContainer>
            {isPublic ? <Icon icon={eyeIcon} /> : <Icon icon={eyeOffIcon} />}
            <span>조회수 10</span>
            {isClickedLike ? (
              <Icon icon={heartFillIcon} />
            ) : (
              <Icon icon={heartIcon} />
            )}
            <span>좋아요 10</span>
          </FlexRowIconContainer>
          {/*  */}
        </Column>

        <Column>
          {/*  */}
          <ContentContainer>
            {/*  */}
            <FlexColumn>
              {/*  */}
              <FlexRow>
                <FlexRowUser>
                  <UserImage></UserImage>
                  <FlexColumnUser>
                    <FlexRowUser>
                      <UserInfoText>
                        {`유저명`} · {`1시간 전`}
                      </UserInfoText>
                    </FlexRowUser>
                    <WeatherInfo>
                      <Icon icon={atIcon} /> {`대구`} {`온도`} {`스카이`}
                    </WeatherInfo>
                  </FlexColumnUser>
                </FlexRowUser>
                <IconWrapper>
                  <Icon icon={weatherSunIcon} />
                </IconWrapper>
              </FlexRow>
              {/*  */}
              {/*  */}
              <FlexColumn>
                <ContentTitle>제목입니다. 제목입니다.</ContentTitle>
                <ContentText>
                  내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
                  내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
                  내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
                  내용입니다. 내용입니다.
                </ContentText>
              </FlexColumn>
              {/*  */}
            </FlexColumn>
            {/*  */}
            <FlexRow>
              <ClothesTagWrapper>
                <ClothesTag color="white" type="아우터" />
                <ClothesTag color="black" type="바지" />
              </ClothesTagWrapper>
              <EditIcon /> {/* 여기는 navigate 하는 함수 보내기 */}
            </FlexRow>
            {/*  */}
          </ContentContainer>
          {/*  */}
        </Column>

        <FullWidthColumn>
          {/*  */}
          <CommentWrapper>
            <Comments board_id={"board_id"} user_id={"테스트유저"} />
          </CommentWrapper>
          {/*  */}
        </FullWidthColumn>
      </GridContainer>
    </Container>
  );
}

//✅ 상단 글 부분
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.borders.containerBorder};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 레이아웃 요소
const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  border: ${({ theme }) => theme.borders.containerBorder};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  gap: 2rem;
`;

//유저
const UserImage = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray};
`;

const FlexColumnUser = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRowUser = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const UserInfoText = styled.div`
  font-size: small;
`;

const WeatherInfo = styled.div`
  font-size: x-small;
  display: flex;
  flex-direction: row;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.yellow};
`;

//글 박스 안
const ContentTitle = styled.div`
  font-size: large;
  font-weight: 600;
`;

const ContentText = styled.div`
  font-size: small;
`;

//마지막
const ClothesTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const FlexRowIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem 0;
  span {
    font-size: small;
  }
`;

//✅ 댓글 부분

const CommentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

//✅ 화면 전체 레이아웃

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

// const Title = styled.div`
//   font-size: x-large;
// `;

const SubTitle = styled.div`
  font-size: large;
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 3fr; /* 2:3 비율의 컬럼 */
  grid-template-rows: auto auto; /* 행의 높이는 콘텐츠에 맞게 자동 조정 */
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto;
    //행의 높이 자동 조정
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 단일 컬럼으로 변경 */
    grid-template-rows: repeat(3, auto);
    //모든 아이템이 세로로 쌓이도록 설정
  }
`;

const Column = styled.div`
  padding: 1rem 0;
  /* border: 1px solid blue; */
`;

const FullWidthColumn = styled.div`
  /* border: 1px solid blue; */
  grid-column: 1 / span 2; /* 두 번째 행 전체를 차지 */

  @media (max-width: 900px) {
    grid-column: 1 / span 2; /* 모바일 화면에서 두 번째 행 전체를 차지하도록 설정 */
  }

  @media (max-width: 600px) {
    grid-column: auto; /* 모든 화면에서 정상적으로 작동하도록 기본값으로 설정 */
  }
`;
