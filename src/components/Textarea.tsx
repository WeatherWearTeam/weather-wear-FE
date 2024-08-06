import styled from "styled-components";

interface TextareaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; //일단 옵셔널
  value: string;
}

export default function Textarea({ onChange, value }: TextareaProps) {
  return (
    <StTextArea
      onChange={onChange}
      value={value}
      placeholder={"내용"}
      name="contents"
      maxLength={500}
      minLength={1}
    />
  );
}

const StTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 10rem;
  outline: none;
  resize: none;
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
