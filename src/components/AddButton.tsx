import styled from "styled-components";

export default function AddButton() {
  return <PostAddButton />;
}

const PostAddButton = styled.button`
  width: 38px;
  height: 38px;
  background-color: black;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0;

  &::before {
    content: '+';
  }
`;