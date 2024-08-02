import styled from "styled-components";

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; //일단 옵셔널
  value?: string; //일단 옵셔널
  label: string;
  name?: string; //일단 옵셔널
  type?: string;
  maxLength?: number;
}

export default function Input({
  onChange,
  value,
  label,
  name,
  type = "text",
  maxLength = 30,
}: InputProps) {
  return (
    <StInput
      value={value}
      id={name}
      name={name}
      onChange={onChange}
      type={type}
      placeholder={label}
      autoComplete="off"
      maxLength={maxLength}
    />
  );
}

export const StInput = styled.input`
  width: 100%;
  outline: none;
  font-size: small;
  padding: 1.5rem 1.5rem;
  border: ${({ theme }) => theme.borders.containerBorder};
  transition: border linear 0.25s;

  &:hover,
  &:focus,
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
`;
