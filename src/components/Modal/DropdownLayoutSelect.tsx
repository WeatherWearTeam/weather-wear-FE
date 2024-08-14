import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  dropdownPosition?: {
    top: number;
    left: number;
    width: number;
  };
}

export default function DropdownLayoutSelect({
  children,
  onClose,
  dropdownPosition,
}: Props) {
  return (
    <>
      <StickyBackdrop onClick={onClose} />
      {dropdownPosition && (
        <StickyDialog
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
        >
          {children}
        </StickyDialog>
      )}
    </>
  );
}

const StickyBackdrop = styled.div`
  inset: 0px;
  position: fixed;
  z-index: 10;
`;

const StickyDialog = styled.div`
  position: absolute;
  z-index: 20;
  background-color: white;
`;
