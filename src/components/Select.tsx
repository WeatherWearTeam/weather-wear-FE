import { ClothesType } from "@store/clothesTagStore";
import DropdownLayout from "@components/Modal/DropdownLayout";
import ModalPortal from "@components/Modal/ModalPortal";
import SelectButton from "@components/SelectButton";
import useDropdownPosition from "@hooks/useDropdownPosition";
import useModal from "@hooks/useModal";
import { useEffect, useState } from "react";
import styled from "styled-components";

const clothesTypeList: OptionType[] = [
  { key: "SLEEVELESS", value: "민소매" },
  { key: "SHORT_SLEEVE", value: "반팔" },
  { key: "LIGHT_SHIRT", value: "얇은 셔츠" },
  { key: "SHIRT", value: "셔츠" },
  { key: "LONG_SLEEVE", value: "긴팔" },
  { key: "LIGHT_KNIT", value: "얇은 니트" },
  { key: "BLOUSE", value: "블라우스" },
  { key: "KNIT", value: "니트" },
  { key: "HOODIE", value: "후드" },
  { key: "SWEAT_SHIRT", value: "맨투맨" },
  //////////////////////////////////////////////////
  { key: "SHORTS", value: "반바지" },
  { key: "MINI_SKIRT", value: "짧은 치마" },
  { key: "DRESS", value: "원피스" },
  { key: "SLACKS", value: "슬랙스" },
  { key: "COTTON_PANTS", value: "면바지" },
  { key: "JEANS", value: "청바지" },
  //////////////////////////////////////////////////
  { key: "STOCKINGS", value: "스타킹" },
  { key: "LEGGINGS", value: "레깅스" },
  //////////////////////////////////////////////////
  { key: "CARDIGAN", value: "가디건" },
  { key: "JACKET", value: "자켓" },
  { key: "TRENCH_COAT", value: "트렌치코트" },
  { key: "MILITARY_JACKET", value: "야상" },
  { key: "LEATHER_JACKET", value: "가죽자켓" },
  { key: "COAT", value: "코트" },
  { key: "PADDED_COAT", value: "패딩" },
  //////////////////////////////////////////////////
  { key: "HEAT_TECH", value: "히트텍" },
  { key: "LINED_CLOTHING", value: "기모" },
  { key: "SCARF", value: "목도리" },
];

type SelectValue = ClothesType | "옷 종류";

interface OptionType {
  key: string;
  value: SelectValue;
}

interface SelectProps {
  onClick: (clothesType: ClothesType) => void;
  value: SelectValue;
}

export default function Select({ onClick, value }: SelectProps) {
  const { openModal, closeModal, isVisible } = useModal();
  const [selectedOption, setSelectedOption] = useState<SelectValue>(value);

  const { dropdownPosition, divRef } = useDropdownPosition(isVisible);

  const onSelectClick = (clothesType: ClothesType) => {
    setSelectedOption(clothesType);
    onClick && onClick(clothesType);
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
                {clothesTypeList.map((option) => (
                  <Option
                    key={option.key}
                    onClick={() => onSelectClick(option.value)}
                  >
                    {option.value}
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
