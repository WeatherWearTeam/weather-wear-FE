import SelectButton from "@components/SelectButton";
import SelectedTag from "@components/SelectedTag";
import { useState } from "react";
import styled from "styled-components";

const clothesTypeList = [
  "나시",
  "티셔츠",
  "셔츠/블라우스",
  "맨투맨/후드",
  "니트/스웨터",
  "반바지",
  "바지/청바지",
  "치마",
  "원피스",
  "가디건",
  "아우터",
  "더 추가 할 항목 있나요?",
];

interface SelectProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; //일단 옵셔널
  value?: string; //일단 옵셔널
  label: string;
  name?: string; //일단 옵셔널
}

export default function Select({
  //   onChange,
  value,
  label,
  name,
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState("옷 종류");

  const onSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newSelect = e.currentTarget.innerText; //e.currentTarget 이벤트가 바인딩된 요소 참조
    setSelectedOption(newSelect); //원시형
    // closeModal();
  };

  return (
    <div>
      {/* <S.SelectButtonWrapper> */}
      <SelectButton
        //  openModal={openModal}
        selectedOption={selectedOption}
      />

      {/* 드롭다운 모달창*/}
      {/* {isVisible && ( */}
      {/* <DropdownLayout onClose={closeModal}> */}
      <OptionList>
        {clothesTypeList.map((option: string) => (
          <Option key={option} onClick={(e) => onSelectClick(e)}>
            {option}
          </Option>
        ))}
      </OptionList>
      {/* </DropdownLayout> */}
      {/* )} */}

      {/* </S.SelectButtonWrapper> */}
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
