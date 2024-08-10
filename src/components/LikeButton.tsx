import React from "react";
import styled, { keyframes, css } from "styled-components";
import { heartFillIcon, heartIcon } from "@shared/icons";

interface LikeButtonProps {
  active: boolean;
  onClick: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ active, onClick }) => {
  return (
    <StyledLikeButton $isActive={active} onClick={onClick}>
      <IconWrapper $isActive={active}>
        {active ? heartFillIcon : heartIcon}
      </IconWrapper>
    </StyledLikeButton>
  );
};

export default LikeButton;

const beating = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.25); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

const StyledLikeButton = styled.button<{ $isActive: boolean }>`
  width: 35px;
  height: 35px;
  background: none;
  cursor: pointer;
  border: 0;
  font-size: 0;

  ${(props) =>
    props.$isActive &&
    css`
      animation: ${beating} 0.5s 1 alternate;
    `}
`;

const IconWrapper = styled.div<{ $isActive: boolean }>`
  svg {
    fill: ${(props) => (props.$isActive ? "red" : "currentColor")};
  }
`;
