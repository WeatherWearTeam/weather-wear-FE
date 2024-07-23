import styled from "styled-components";
import ColorChip from "@components/ColorChip";

interface ColorChipProps {
  color: string;
}

function Posts({ color }: ColorChipProps) {

  return (
    <MyPageContentsContainer>
      <MyPageContentsTop>
        필터 및 검색 영역
      </MyPageContentsTop>
      <MyPageContentsBottom>
        <MyPageContentsItem>
          <MyPageContentsListImage>마이페이지 이미지1</MyPageContentsListImage>
          <MyPageContentsListData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsListData>
          <MyPageContentsListTitle>이미지 제목</MyPageContentsListTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
          <MyPageContentsListImage>마이페이지 이미지2</MyPageContentsListImage>
          <MyPageContentsListData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsListData>
          <MyPageContentsListTitle>이미지 제목</MyPageContentsListTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
        <MyPageContentsListImage>마이페이지 이미지3</MyPageContentsListImage>
          <MyPageContentsListData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsListData>
          <MyPageContentsListTitle>이미지 제목</MyPageContentsListTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
        <MyPageContentsListImage>마이페이지 이미지4</MyPageContentsListImage>
          <MyPageContentsListData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsListData>
          <MyPageContentsListTitle>이미지 제목</MyPageContentsListTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
        <MyPageContentsListImage>마이페이지 이미지5</MyPageContentsListImage>
          <MyPageContentsListData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsListData>
          <MyPageContentsListTitle>이미지 제목</MyPageContentsListTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
        <MyPageContentsListImage>마이페이지 이미지6</MyPageContentsListImage>
          <MyPageContentsListData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsListData>
          <MyPageContentsListTitle>이미지 제목</MyPageContentsListTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
        <MyPageContentsListImage>마이페이지 이미지7</MyPageContentsListImage>
          <MyPageContentsListData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsListData>
          <MyPageContentsListTitle>이미지 제목</MyPageContentsListTitle>
        </MyPageContentsItem>
        <MyPageContentsItem>
        <MyPageContentsListImage>마이페이지 이미지8</MyPageContentsListImage>
          <MyPageContentsListData>
            <span>data</span>
            <Color color={color} />
          </MyPageContentsListData>
          <MyPageContentsListTitle>이미지 제목</MyPageContentsListTitle>
        </MyPageContentsItem>
      </MyPageContentsBottom>
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

`;

const MyPageContentsTop = styled.div`
  background-color: pink;
  width: 85%;
  height: 60px;
`;

const MyPageContentsBottom = styled.div`
  background-color: blue;
  height: calc(100% - 60px); /* MyPageContentsTop의 높이를 뺀 나머지 높이 */
  width: 85%;
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈 설정 */
  gap: 20px; /* 요소 간의 간격 설정 */
`;

const MyPageContentsItem = styled.div`
  background-color: black;
  width: 250px;
  height: 320px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
`;

const MyPageContentsListImage = styled.div`
  background-color: gray;
  width: 250px;
  height: 270px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
`;

const MyPageContentsListData = styled.div`
  background-color: pink;
  width: 250px;
  height: 25px;
  font-size: 12px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px; /* 텍스트와 컨테이너 사이에 여백 추가 */
`;

const MyPageContentsListTitle = styled.div`
  background-color: white;
  color: black;
  width: 250px;
  height: 25px;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
`;

const Color = styled.div<{ color: string }>`
  width: 1rem;
  height: 1rem;
  background-color: ${({ color, theme }) => theme.colors[color]};
  border: ${({ theme }) => theme.borders.buttonBorder};
`;
