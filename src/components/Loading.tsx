import styled from "styled-components";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message }: LoadingProps) {
  return (
    <LoadingWrapper>
      <Indicator>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Indicator>
      <LoadingMessage>{message}</LoadingMessage>
    </LoadingWrapper>
  );
}

export const LoadingWrapper = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.85;
  gap: 2rem;
`;

export const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  white-space: pre-line; //줄바꿈
  font-size: small;
`;

export const Indicator = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.BLACK};
    animation: lds-grid 1.2s linear infinite;
  }
  div:nth-child(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }
  div:nth-child(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }
  div:nth-child(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }
  div:nth-child(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }
  div:nth-child(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }
  div:nth-child(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }
  div:nth-child(7) {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }
  div:nth-child(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }
  div:nth-child(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }

  @keyframes lds-grid {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
