import styled from "styled-components";
import ColorChip from "@components/ColorChip";

interface ColorChipProps {
  color: string;
}

function Posts({ color }: ColorChipProps) {

  return (
    <MyPageContentsContainer>
      <MyPageContentsHeader>
        필터 및 검색 영역
      </MyPageContentsHeader>
      <MyPageContentsMain>
        <MyPageContentsItem>
          <MyPageContentsItemImage>마이페이지 이미지1</MyPageContentsItemImage>
          <MyPageContentsItemData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsItemData>
          <MyPageContentsItemTitle>이미지 제목</MyPageContentsItemTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
          <MyPageContentsItemImage>마이페이지 이미지2</MyPageContentsItemImage>
          <MyPageContentsItemData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsItemData>
          <MyPageContentsItemTitle>이미지 제목</MyPageContentsItemTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
          <MyPageContentsItemImage>마이페이지 이미지3</MyPageContentsItemImage>
          <MyPageContentsItemData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsItemData>
          <MyPageContentsItemTitle>이미지 제목</MyPageContentsItemTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
          <MyPageContentsItemImage>마이페이지 이미지4</MyPageContentsItemImage>
          <MyPageContentsItemData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsItemData>
          <MyPageContentsItemTitle>이미지 제목</MyPageContentsItemTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
          <MyPageContentsItemImage>마이페이지 이미지5</MyPageContentsItemImage>
          <MyPageContentsItemData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsItemData>
          <MyPageContentsItemTitle>이미지 제목</MyPageContentsItemTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
          <MyPageContentsItemImage>마이페이지 이미지1</MyPageContentsItemImage>
          <MyPageContentsItemData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsItemData>
          <MyPageContentsItemTitle>이미지 제목</MyPageContentsItemTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
          <MyPageContentsItemImage>마이페이지 이미지1</MyPageContentsItemImage>
          <MyPageContentsItemData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsItemData>
          <MyPageContentsItemTitle>이미지 제목</MyPageContentsItemTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
          <MyPageContentsItemImage>마이페이지 이미지1</MyPageContentsItemImage>
          <MyPageContentsItemData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsItemData>
          <MyPageContentsItemTitle>이미지 제목</MyPageContentsItemTitle>
        </MyPageContentsItem>
      </MyPageContentsMain>
      <MyPageContentsFooter>
        <FooterButtons>
          <PreviousButton />
          <NextButton />
        </FooterButtons>
        <PostAddButton />
      </MyPageContentsFooter>
    </MyPageContentsContainer>
  );
}

export default Posts;

const MyPageContentsContainer = styled.div`
  width: 100%;
  height: 80vh;
  position: fixed;
  top: 175px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column; /* 수직 방향 정렬 */
  align-items: center; /* 수직 방향 정렬에서 가로 중앙 정렬 */
  padding: 0 15px;
  overflow-y: auto;
`;

const MyPageContentsHeader = styled.div`
  background-color: white;
  width: 85%;
  height: 60px;
  max-width: 1090px;
  flex-shrink: 0; /* 고정된 높이 유지 */
  position: fixed;
  top: 175px;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box; /* 패딩을 포함한 박스 크기 조정 */
`;

const MyPageContentsMain = styled.div`

  width: 85%;
  max-width: 1090px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 아이템 */
  grid-auto-rows: auto;
  gap: 30px;
  padding: 75px 0 15px 0; /* MyPageContentsHeader의 높이만큼 패딩 추가 */
`;

const MyPageContentsItem = styled.div`

  width: 250px;
  height: 320px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
`;

const MyPageContentsItemImage = styled.div`
  background-color: gray;
  width: 250px;
  height: 270px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
`;

const MyPageContentsItemData = styled.div`

  width: 250px;
  height: 25px;
  font-size: 12px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px; /* 텍스트와 컨테이너 사이에 여백 추가 */
`;

const MyPageContentsItemTitle = styled.div`
  background-color: white;
  color: black;
  width: 250px;
  height: 25px;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
`;

const MyPageContentsFooter = styled.div`

  width: 85%;
  height: 50px;
  display: flex;
  justify-content: center; /* 수평 정렬을 가운데로 설정 */
  align-items: center;
  padding: 0 20px;
  max-width: 1220px;
  flex-shrink: 0; /* 고정된 높이 유지 */
`;

const FooterButtons = styled.div`
  display: flex;
  gap: 5px;
  margin: 0 auto;
`;

const FooterButton = styled.button`
  width: 23px;
  height: 23px;
  background-color: white;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
`;

const PreviousButton = styled(FooterButton)`
  margin-left: 35px;
  &::before {
    content: '<';
  }
`;

const NextButton = styled(FooterButton)`
  &::before {
    content: '>';
  }
`;

const PostAddButton = styled.button`
  width: 38px;
  height: 38px;
  background-color: black;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0;

  &::before {
    content: '+';
  }
`;

const Color = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  background-color: ${({ color, theme }) => theme.colors[color]};
  border: ${({ theme }) => theme.borders.buttonBorder};
`;
