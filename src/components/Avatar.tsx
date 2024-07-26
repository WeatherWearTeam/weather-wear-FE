import { userCircleIcon } from "@shared/icons";
import styled from "styled-components";

interface AvatarProps {
  size?: "s" | "m" | "lg" | "xl";
  onClick?: () => void;
}
// 3rem / 4rem / 5rem / 12rem

export default function Avatar({ size = "m", onClick }: AvatarProps) {
  //✅ 임의 설정
  const hasUserImage = false;

  return (
    <AvatarWrapper $size={size} onClick={onClick}>
      {hasUserImage ? (
        <AvatarImg $size={size} src={`#`} alt="user image" />
      ) : (
        <DefaultUserIconWrapper $size={size}>{userCircleIcon}</DefaultUserIconWrapper>
      )}
    </AvatarWrapper>
  );
}

interface AvatarProps {
  $size?: "s" | "m" | "lg" | "xl";
}

const AvatarWrapper = styled.div<AvatarProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme, $size = "m" }) => theme.size[$size].width};
  height: ${({ theme, $size = "m" }) => theme.size[$size].height};
  background-color: ${({ theme }) => theme.colors.borderLightGray};
  border-radius: 50%;
`;

const AvatarImg = styled.img<AvatarProps>`
  width: ${({ theme, $size = "m" }) => theme.size[$size].width};
  height: ${({ theme, $size = "m" }) => theme.size[$size].height};
  border-radius: 50%;
`;

const DefaultUserIconWrapper = styled.div<AvatarProps>`
  width: ${({ theme, $size = "m" }) => theme.size[$size].width};
  height: ${({ theme, $size = "m" }) => theme.size[$size].height};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    background-color: ${({ theme }) => theme.colors.borderLightGray};
    border-radius: 50%;
  }
`;
