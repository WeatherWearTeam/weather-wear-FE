import { useMemo } from "react";
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

  z-index: 1; /* Ensure it's below other elements */
  pointer-events: none; /* Disable pointer events for this component */
`;

const Rain = styled.div<{ className?: string }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2; /* Ensure it's below the content but above Body */
`;

const dropAnimation = keyframes`
  0% {
    transform: translateY(0vh);
  }
  75% {
    transform: translateY(90vh);
  }
  100% {
    transform: translateY(90vh);
  }
`;

const stemAnimation = keyframes`
  0% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const splatAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(0);
  }
  80% {
    opacity: 1;
    transform: scale(0);
  }
  90% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

const Drop = styled.div<{
  $left?: string;
  $right?: string;
  $bottom?: string;
  $animationDelay?: string;
  $animationDuration?: string;
}>`
  position: absolute;
  bottom: ${(props) => props.$bottom || "100%"};
  left: ${(props) => props.$left || "auto"};
  right: ${(props) => props.$right || "auto"};
  width: 15px;
  height: 120px;
  pointer-events: none;
  animation: ${dropAnimation} ${(props) => props.$animationDuration || "0.5s"}
    linear infinite;
  animation-delay: ${(props) => props.$animationDelay || "0s"};
`;

const Stem = styled.div<{
  $animationDelay?: string;
  $animationDuration?: string;
}>`
  width: 1px;
  height: 60%;
  margin-left: 7px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.25)
  );
  animation: ${stemAnimation} ${(props) => props.$animationDuration || "0.5s"}
    linear infinite;
  animation-delay: ${(props) => props.$animationDelay || "0s"};
`;

const Splat = styled.div`
  width: 15px;
  height: 10px;
  border-top: 2px dotted rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  opacity: 1;
  transform: scale(0);
  animation: ${splatAnimation} 0.5s linear infinite;
  display: none;
`;

// Helper function to generate drops
const generateDrops = (isBackRow: boolean) => {
  const generatedDrops = [];
  let increment = 0;

  while (increment < 100) {
    const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
    const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    increment += randoFiver;

    generatedDrops.push(
      <Drop
        key={`drop-${increment}-${randoHundo}`}
        $left={!isBackRow ? `${increment}%` : undefined}
        $right={isBackRow ? `${increment}%` : undefined}
        $bottom={`${randoFiver + randoFiver - 1 + 100}%`}
        $animationDelay={`0.${randoHundo}s`}
        $animationDuration={`0.5${randoHundo}s`}
      >
        <Stem
          $animationDelay={`0.${randoHundo}s`}
          $animationDuration={`0.5${randoHundo}s`}
        />
        <Splat />
      </Drop>
    );
  }

  return generatedDrops;
};

// Main component
export default function Rainy() {
  const drops = useMemo(() => generateDrops(false), []);
  const backDrops = useMemo(() => generateDrops(true), []);

  return (
    <Body>
      <Rain className="front-row">{drops}</Rain>
      <Rain className="back-row">{backDrops}</Rain>
    </Body>
  );
}
