import styled from "styled-components";

// Styled components
const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: linear-gradient(to top, #ffff 0%, #b9ddff 15%, #a4adb6 100%);
  z-index: 1; /* 배경의 z-index 설정 */
`;

// Main component
export default function Cloudy() {
  return <Body />;
}
