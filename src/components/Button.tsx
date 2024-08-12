import Icon from "@components/Icon";
import styled, { css } from "styled-components";

type buttonType = "primary" | "secondary";

interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  buttonType?: buttonType;
  type?: "button" | "submit";
  htmlFor?: string;
  selected?: boolean;
}

export default function Button({
  children,
  type = "button",
  icon = null,
  onClick,
  disabled = false,
  buttonType = "primary",
  htmlFor,
  selected = false,
}: ButtonProps) {
  return (
    <StButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      $buttonType={buttonType}
      id={htmlFor}
      $selected={selected}
    >
      {icon && (
        <Container>
          <Icon icon={icon} />
          {children}
        </Container>
      )}
      {!icon && children}
    </StButton>
  );
}

interface buttonsProps {
  $buttonType?: buttonType;
  $selected?: boolean;
}

const StButton = styled.button<buttonsProps>`
  background-color: ${({ theme, $buttonType = "primary" }) =>
    theme.buttons[$buttonType].backgroundColor};
  border: ${({ theme, $buttonType = "primary" }) =>
    theme.buttons[$buttonType].border || "inherit"};
  color: ${({ theme, $buttonType = "primary" }) =>
    theme.buttons[$buttonType].color || "inherit"};
  width: 100%;
  padding: 1.2rem 0;
  cursor: pointer;
  transition: border-color linear 0.2s;
  outline: none;

  &:hover {
    ${({ theme, $buttonType = "primary" }) => theme.buttons[$buttonType].hover};
  }
  &:focus {
    ${({ theme, $buttonType = "primary" }) => theme.buttons[$buttonType].focus};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ theme, $buttonType = "primary", $selected }) => css`
    background-color: ${theme.buttons[$buttonType].backgroundColor};
    border: ${theme.buttons[$buttonType].border};
    color: ${theme.buttons[$buttonType].color};

    &:hover {
      ${theme.buttons[$buttonType].hover};
    }

    ${$selected && theme.buttons[$buttonType].focus};
  `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: small;
`;
