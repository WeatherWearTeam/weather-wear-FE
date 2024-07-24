import styled from "styled-components";

export default function Textarea() {
  return (
    <StTextArea
      //   onChange={}
      //   value={}
      placeholder={"내용"}
      name="content"
      maxLength={500}
      minLength={1}
    />
  );
}

const StTextArea = styled.textarea`
  width: 100%;
  height: 100%;
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
