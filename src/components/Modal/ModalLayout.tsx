import Button from "@components/Button";
import { closeIcon } from "@shared/icons";

interface ModalLayoutProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function ModalLayout({ children, onClose }: ModalLayoutProps) {
  return (
    <>
      <Backdrop onClick={onClose} />
      <Dialog
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <DialogButtonWrapper>
          <Button type="button" icon={closeIcon} onClick={onClose} />
        </DialogButtonWrapper>
        <DialogContentWrapper>{children}</DialogContentWrapper>
      </Dialog>
    </>
  );
}

import styled from "styled-components";

export const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  inset: 0px;
  position: fixed;
  opacity: 0.8;
  background-color: rgb(221, 221, 221);
  z-index: 10;
`;

export const Dialog = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  padding: 24px;
  background-color: rgb(255, 255, 255);
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  z-index: 20;
`;
export const DialogButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const DialogContentWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  overflow: auto;
`;
