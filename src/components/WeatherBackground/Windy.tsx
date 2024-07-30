import { useMemo } from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for wind streaks
const windStreaks = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 0.5;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Styled components
const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: linear-gradient(to top, #ffffff 0%, #d6f2ff 15%, #a1c4fd 100%);
  z-index: 1; /* 배경의 z-index 설정 */
`;

const Wind = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 바람의 z-index 설정 (글씨보다 낮게) */
  display: block;
`;

const WindStreak = styled.div<{
  $top?: string;
  $animationDuration?: string;
}>`
  position: absolute;
  top: ${(props) => props.$top || "20%"};
  left: 0;
  width: 50vw; /* 선의 길이를 조정합니다. */
  height: 1px;
  background: rgba(255, 255, 255, 0.8);
  animation: ${windStreaks} ${(props) => props.$animationDuration || "8s"}
    linear infinite;
  will-change: transform, opacity;
  opacity: 0.3;
  z-index: 2; /* 바람의 z-index */
`;
// Main component
export default function Windy() {
  // Generate multiple wind streaks
  const windStreaksElements = useMemo(() => {
    return Array.from({ length: 5 }).map((_, index) => (
      <WindStreak
        key={index}
        $top={`${20 + index * 10}%`}
        $animationDuration={`${5 + Math.random() * 5}s`}
      />
    ));
  }, []); // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

  return (
    <Body>
      <Wind>{windStreaksElements}</Wind>
    </Body>
  );
}
