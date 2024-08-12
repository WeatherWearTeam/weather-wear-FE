import Avatar from "@components/Avatar";
import Icon from "@components/Icon";
import { logoutIcon, settingIcon } from "@shared/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface SettingDialogProps {
  onClose: () => void;
  onLogout: () => void;
  isPendingLogout: boolean;
  myImage: string | null;
  myNickname: string;
  myEmail: string;
}

export default function SettingDialog({
  onClose,
  onLogout,
  isPendingLogout,
  myImage,
  myNickname,
  myEmail,
}: SettingDialogProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); //로그아웃
    if (!isPendingLogout) {
      onClose();
    }
  };

  return (
    <>
      <ContentWrapper>
        <DialogList>
          <UserInfo>
            <Avatar size="m" image={myImage} />
            <TextContainer>
              <Text>{myNickname}</Text>
              <Text>{myEmail}</Text>
            </TextContainer>
          </UserInfo>
          <DialogItem
            onClick={() => {
              navigate("/my");
              onClose();
            }}
          >
            <Icon icon={settingIcon} /> 내 계정
          </DialogItem>
          <DialogItem onClick={handleLogout}>
            <Icon icon={logoutIcon} />
            로그아웃
          </DialogItem>
        </DialogList>
      </ContentWrapper>
    </>
  );
}

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DialogList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  border: ${({ theme }) => theme.borders.containerBorder};
  box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.borderLightGray};
  min-width: 20rem;
  /* border-radius: 8px; */
`;

export const DialogItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 2rem;
  font-size: small;
  &:hover {
    background-color: ${({ theme }) => theme.colors.borderLightGray};
  }
  /* 
  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  } */
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 1rem;
  border-bottom: ${({ theme }) => theme.borders.containerBorder};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text = styled.p`
  font-size: small;
  &:first-child {
    font-weight: 600;
  }
`;
