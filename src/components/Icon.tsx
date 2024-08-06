import styled from "styled-components";

interface IconProps {
  icon: React.ReactNode;
}

export default function Icon({ icon }: IconProps) {
  return <Wrapper>{icon}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
`;
