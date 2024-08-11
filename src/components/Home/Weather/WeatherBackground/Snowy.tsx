import styled, { keyframes } from "styled-components";

// Styled components
const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: linear-gradient(to top, #ffff 0%, #ffffff2c 15%, #4f6471 100%);

  z-index: 1; /* 배경의 z-index 설정 */
`;

const Snow = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 눈송이의 z-index 설정 (글씨보다 낮게) */
  display: block;
`;

const snowAnimation = keyframes`
  0% {
    transform: translateY(-100px);
    opacity: 0.9;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
`;

const Snowflake = styled.div<{
  left?: string;
  top?: string;
  animationDelay?: string;
  animationDuration?: string;
  size?: string;
}>`
  position: absolute;
  width: ${(props) => props.size || "15px"};
  height: ${(props) => props.size || "15px"};
  background-color: white;
  border-radius: 50%;
  opacity: 0.9;
  animation: ${snowAnimation} ${(props) => props.animationDuration || "15s"}
    linear infinite;
  animation-delay: ${(props) => props.animationDelay || "0s"};
  left: ${(props) => props.left || "auto"};
  top: ${(props) => props.top || "auto"};
`;

// Main component
export default function Snowy() {
  // Generate snowflakes
  const generateSnowflakes = () => {
    const snowflakes = [];
    let increment = 0;

    while (increment < 100) {
      const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
      const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
      increment += randoFiver;

      snowflakes.push(
        <Snowflake
          key={`snowflake-${increment}-${randoHundo}`}
          left={`${increment}%`}
          top={`${Math.random() * 100}%`}
          animationDelay={`0.${randoHundo}s`}
          animationDuration={`${Math.random() * 15 + 15}s`} // 랜덤 duration 설정
          size={`${Math.random() * 10 + 10}px`} // 랜덤 크기
        />
      );
    }

    return snowflakes;
  };

  return (
    <Body>
      <Snow>{generateSnowflakes()}</Snow>
    </Body>
  );
}
