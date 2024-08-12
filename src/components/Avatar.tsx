import { userCircleIcon } from "@shared/icons";
import styled from "styled-components";

interface AvatarProps {
  size?: "s" | "m" | "lg" | "xl";
  image: string | null;
  onClick?: () => void;
}
// 3rem / 4rem / 5rem / 12rem

export default function Avatar({ size = "m", image, onClick }: AvatarProps) {
  //✅ 임의 설정

  return (
    <AvatarWrapper $size={size} onClick={onClick}>
      {image ? (
        <AvatarImg $size={size} src={image} alt="user image" />
      ) : (
        <DefaultUserIconWrapper $size={size}>
          {userCircleIcon}
        </DefaultUserIconWrapper>
      )}
    </AvatarWrapper>
  );
}

interface StyledAvatarProps {
  $size?: "s" | "m" | "lg" | "xl";
}

const AvatarWrapper = styled.div<StyledAvatarProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme, $size = "m" }) => theme.size[$size].width};
  height: ${({ theme, $size = "m" }) => theme.size[$size].height};
  background-color: ${({ theme }) => theme.colors.borderLightGray};
  border-radius: 50%;
`;

const AvatarImg = styled.img<StyledAvatarProps>`
  width: ${({ theme, $size = "m" }) => theme.size[$size].width};
  height: ${({ theme, $size = "m" }) => theme.size[$size].height};
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultUserIconWrapper = styled.div<StyledAvatarProps>`
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
