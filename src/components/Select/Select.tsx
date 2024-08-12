import DropdownLayout from "@components/Modal/DropdownLayout";
import ModalPortal from "@components/Modal/ModalPortal";
import SelectButton from "@components/Select/SelectButton";
import useDropdownPosition from "@hooks/useDropdownPosition";
import useModal from "@hooks/useModal";
import { ClothesKoreanType, ClothesType } from "@shared/clothesTypeList";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface SelectProps {
  list: { key: ClothesType; value: ClothesKoreanType }[];
  onClick: (key: ClothesType, value: ClothesKoreanType) => void;
  value: ClothesKoreanType | "옷 종류";
}

export default function Select({ list, onClick, value }: SelectProps) {
  const { openModal, closeModal, isVisible } = useModal();
  const { dropdownPosition, divRef } = useDropdownPosition(isVisible);

  const [selectedOption, setSelectedOption] = useState<
    ClothesKoreanType | "옷 종류"
  >(value);

  const onSelectClick = (key: ClothesType) => {
    const selected = list.find((option) => option.key === key);
    if (selected) {
      setSelectedOption(selected.value);
      onClick(selected.key, selected.value); // Pass both key and value to onClick
    }
    closeModal();
  };

  useEffect(() => {
    setSelectedOption(value); // value prop이 변경되면 selectedOption을 업데이트
  }, [value]);

  return (
    <div>
      <>
        <SelectButton
          openModal={openModal}
          selectedOption={selectedOption!}
          divRef={divRef}
        />
        {/* 드롭다운 모달창*/}
        {isVisible && (
          <ModalPortal>
            <DropdownLayout
              onClose={closeModal}
              dropdownPosition={{ ...dropdownPosition }}
            >
              <OptionList>
                {list.map(({ key, value }) => (
                  <Option key={key} onClick={() => onSelectClick(key)}>
                    {value}
                  </Option>
                ))}
              </OptionList>
            </DropdownLayout>
          </ModalPortal>
        )}
      </>
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
  height: 15rem;
  overflow-y: auto;
  background-color: white;
  cursor: pointer;
`;

const Option = styled.li`
  width: 100%;
  padding: 1rem;
  font-size: small;
  &:hover {
    background-color: rgb(221, 221, 221);
  }
`;
