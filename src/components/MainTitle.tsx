import styled from "styled-components";

function MainTitle() {
  return (
    <MainTitleContainer>
      <MainTitleTop>마이 페이지</MainTitleTop>
      <MainTitleBottom>
        <MainTitleSelectedItem>나의 OOTD</MainTitleSelectedItem>
        <MainTitleItem>내 옷장</MainTitleItem>
        <MainTitleItem>위시리스트</MainTitleItem>
      </MainTitleBottom>
    </MainTitleContainer>
  );
}

export default MainTitle;

const MainTitleContainer = styled.div`
  width: 100%;
  height: 120px;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-direction: column; /* 수직 정렬 */
  align-items: flex-start; /* 상단 정렬 */
  padding: 0 15px;
`;

const MainTitleTop = styled.div`
  color: black;
  width: 100%;
  height: 50%;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  margin: 0; /* 기본 여백 제거 */
  padding: 0 20px; /* 텍스트와 컨테이너 사이에 여백 추가 */
  font-size: 24px;
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
`;

const MainTitleBottom = styled.div`
  color: black;
  width: 100%;
  height: 50%;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  margin: 0; /* 기본 여백 제거 */
  padding: 0 20px; /* 텍스트와 컨테이너 사이에 여백 추가 */
  font-size: 2em; /* h1 크기 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 박스 크기 조정 */
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 80px; /* 간격 조정 */
  border-bottom: 1px solid gray; /* 하단의 수평선 */
`;

const MainTitleSelectedItem = styled.div`
  background-color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const MainTitleItem = styled.div`
  background-color: white;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;
