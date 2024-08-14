import DropdownLayoutSelect from "@components/Modal/DropdownLayoutSelect";
import ModalPortal from "@components/Modal/ModalPortal";
import SelectButton from "@components/Select/SelectButton";
import useModal from "@hooks/useModal";
import useOutsideClick from "@hooks/useOutsideClick";
import { ClothesKoreanType, ClothesType } from "@shared/clothesTypeList";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

interface SelectProps {
  list: { key: ClothesType; value: ClothesKoreanType }[];
  onClick: (key: ClothesType, value: ClothesKoreanType) => void;
  value: ClothesKoreanType | "옷 종류";
}

export default function SelectClothes({ list, onClick, value }: SelectProps) {
  const { openModal, closeModal, isVisible } = useModal();
  const [selectedOption, setSelectedOption] = useState<
    ClothesKoreanType | "옷 종류"
  >(value);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const onSelectClick = (key: ClothesType) => {
    const selected = list.find((option) => option.key === key);
    if (selected) {
      setSelectedOption(selected.value);
      onClick(selected.key, selected.value);
    }
    closeModal();
  };

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  useEffect(() => {
    if (isVisible && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }
  }, [isVisible]);

  useOutsideClick(modalRef, closeModal);

  return (
    <div>
      <SelectButton
        openModal={openModal}
        selectedOption={selectedOption!}
        divRef={buttonRef}
      />
      {isVisible && dropdownPosition && (
        <DropdownLayoutSelect
          onClose={closeModal}
          dropdownPosition={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: buttonRef.current?.offsetWidth ?? 0,
          }}
        >
          <div ref={modalRef}>
            <OptionList>
              {list.map(({ key, value }) => (
                <Option key={key} onClick={() => onSelectClick(key)}>
                  {value}
                </Option>
              ))}
            </OptionList>
          </div>
        </DropdownLayoutSelect>
      )}
    </div>
  );
}

const OptionList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  font-size: 13px;
  border: 1px solid rgb(221, 221, 221);
  max-height: 15rem;
  overflow-y: auto;
  background-color: white;
  margin: 0;
  box-sizing: border-box;
`;

const Option = styled.li`
  width: 100%;
  padding: 1rem;
  font-size: small;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;
