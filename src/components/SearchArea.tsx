import styled from "styled-components";

export default function SearchArea() {
  return <ContentsHeader>필터 및 검색 영역</ContentsHeader>;
}

const ContentsHeader = styled.div`
  background-color: white;
  width: 100%;
  height: 60px;
  max-width: 1090px;
  flex-shrink: 0; /* 고정된 높이 유지 */
  position: fixed;
  top: 175px;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  flex-direction: column; /* 수직 방향 정렬 */
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box; /* 패딩을 포함한 박스 크기 조정 */
`;