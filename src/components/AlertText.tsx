import styled from "styled-components";

interface AlertTextProps {
  children: React.ReactNode;
}

export default function AlertText({ children }: AlertTextProps) {
  return <Text>{children}</Text>;
}

const Text = styled.div`
  font-size: small;
  color: ${({ theme }) => theme.colors.red};
`;
