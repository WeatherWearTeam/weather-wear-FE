import { getTimesAgo } from "@utils/getTime";
import { getSkyState } from "@utils/getWeather";
import Comments from "@components/Comment/Comments";
import Icon from "@components/Icon";
import {
  useBoardById,
  useDeleteBoard,
  useToggleLikeBoard,
} from "@queries/boardQueries";
import {
  atIcon,
  eyeIcon,
  eyeOffIcon,
  // heartFillIcon,
  // heartIcon,
  weatherSunIcon,
} from "@shared/icons";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import EditDeleteButton from "@components/EditDeleteButton";
import ClothesTag from "@components/ClothesTag";
import { ClothesType } from "@shared/clothesTypeList";
import { ClothesColorType } from "@shared/colorTypeList";
import useAuth from "@queries/useAuth";
import { useMe } from "@queries/userQueries";
import WeatherStateIcon from "@components/Weather/WeatherStateIcon";
import LikeButton from "@components/LikeButton";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";

export default function PostDetail() {
  const { mutateToggleLikeBoard } = useToggleLikeBoard();
  const [isClickedLike, setIsClickedLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  //////////////////////////////////////////////////////////////////
  const { id: boardId } = useParams(); //현재 Board id url에서 가져오기
  const { isLoggedIn } = useAuth();
  const { me } = useMe(isLoggedIn);
  const {
    board,
    isPending,
    //   isError,
    isSuccess,
  } = useBoardById(Number(boardId));

  useEffect(() => {
    if (board) {
      setLikesCount(board.boardLikesCount);
    }
    if (board?.checkLike) {
      setIsClickedLike(true);
    } else if (!board?.checkLike) {
      setIsClickedLike(false);
    }
  }, [board]);

  const handleLikeClick = () => {
    // 서버에 좋아요 상태 전송
    mutateToggleLikeBoard(Number(boardId));
  };

  //🌈 isPending, isError, isSuccess 값 사용해서 UX 개선하기

  const { mutateDeleteBoard } = useDeleteBoard();
  return (
    <>
      {isPending && <Loading />}
      <Container>
        <TitleContainer>
          {/* <Title>나의 OOTD</Title> */}
          <SubTitle>OOTD</SubTitle>
        </TitleContainer>
        <GridWrapper>
          <GridContainer>
            {isSuccess && board && (
              <>
                <Column>
                  <ImageWrapper>
                    <img src={board.image} alt="ootd 사진" />
                    {/* 이미지 로드 실패 시 예외 처리 필요 */}
                  </ImageWrapper>

                  <FlexRowIconContainer>
                    {!board.isPrivate ? (
                      <Icon icon={eyeIcon} />
                    ) : (
                      <Icon icon={eyeOffIcon} />
                    )}
                    <span>조회수 {board.views}</span>
                    <LikeButton
                      active={isClickedLike}
                      onClick={handleLikeClick}
                    />
                    <span>좋아요 {likesCount}</span>{" "}
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
                          <UserImage>
                            <AvatarImg src={board?.user.image} />
                          </UserImage>
                          <FlexColumnUser>
                            <FlexRowUser>
                              <UserInfoText>
                                {board?.user.nickname} ·{" "}
                                {getTimesAgo(board?.createdAt as string)}
                              </UserInfoText>
                            </FlexRowUser>
                            <WeatherInfo>
                              <Location>
                                {atIcon}
                                <span>{board.address}</span>
                              </Location>
                              <span>{board.weather.tmp}°C </span>
                              <span>{getSkyState(board.weather.sky)}</span>
                            </WeatherInfo>
                          </FlexColumnUser>
                        </FlexRowUser>
                        <IconWrapper>
                          {isSuccess && board.weather ? (
                            <WeatherStateIcon
                              pty={board.weather.pty}
                              sky={board.weather.sky}
                            />
                          ) : (
                            <Icon icon={weatherSunIcon} />
                          )}
                        </IconWrapper>
                      </FlexRow>
                      {/*  */}
                      {/*  */}
                      <FlexColumn>
                        <>
                          <ContentTitle>{board?.title}</ContentTitle>
                          <ContentText>{board?.contents}</ContentText>
                        </>
                      </FlexColumn>
                      {/*  */}
                    </FlexColumn>
                    {/*  */}
                    <FlexRow>
                      <ClothesTagWrapper>
                        {board?.tags.map(
                          (
                            tag: {
                              color: ClothesColorType;
                              type: ClothesType;
                            },
                            index: number
                          ) => (
                            <ClothesTag
                              key={index}
                              color={tag.color}
                              type={tag.type}
                            />
                          )
                        )}
                      </ClothesTagWrapper>
                      {board.user.id === me?.id && (
                        <EditDeleteButton
                          id={board.id}
                          editPath={`/ootd/${board.id}/edit`}
                          onMutateDelete={mutateDeleteBoard}
                        />
                      )}
                      {/* 여기는 navigate 하는 함수 보내기 */}
                    </FlexRow>
                    {/*  */}
                  </ContentContainer>
                  {/*  */}
                </Column>
              </>
            )}

            <FullWidthColumn>
              {/*  */}
              <CommentWrapper>
                <Comments boardId={board?.id as number} />
              </CommentWrapper>
              {/*  */}
            </FullWidthColumn>
          </GridContainer>
        </GridWrapper>
      </Container>
    </>
  );
}

//✅ 상단 글 부분
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.WHITE};
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
  gap: 2rem;
`;

//유저
const UserImage = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.GRAY};
`;

const AvatarImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
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
  gap: 0.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Location = styled.div`
  display: flex;
  flex-direction: row;
  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.YELLOW};
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
  flex-wrap: wrap;
  gap: 1rem;
`;

const FlexRowIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem 0;
  align-items: center;
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
  /* height: calc(100vh - 7rem); */
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

const SubTitle = styled.div`
  font-size: large;
`;

const GridWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridContainer = styled.div`
  height: 100%;
  max-width: 100rem;

  display: grid;
  grid-template-columns: 2fr 3fr; /* 2:3 비율의 컬럼 */
  grid-template-rows: auto auto; /* 행의 높이는 콘텐츠에 맞게 자동 조정 */
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
  }
`;

const Column = styled.div`
  padding: 1rem 0;
`;

const FullWidthColumn = styled.div`
  grid-column: 1 / span 2;

  @media (max-width: 900px) {
    grid-column: 1 / span 2;
  }

  @media (max-width: 600px) {
    grid-column: auto;
  }
`;
