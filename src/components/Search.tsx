import React, { useState } from "react";
import styled from "styled-components";
import Icon from "@components/Icon";
import { searchIcon } from "@shared/icons";

interface SearchProps {
  onSearchKeyword: (keyword: string) => void;
}

export default function Search({ onSearchKeyword }: SearchProps) {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!keyword.trim()) {
      return alert("검색어를 입력해 주세요!");
    }

    onSearchKeyword(keyword);
  };

  return (
    <ContentsHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={handleInputChange}
        />
        <SearchButton type="button">
          <Icon icon={searchIcon} />
        </SearchButton>
      </SearchForm>
    </ContentsHeader>
  );
}

const ContentsHeader = styled.div`
  width: 100%;
  max-width: 1090px;
  flex-shrink: 0; /* 고정된 높이 유지 */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  box-sizing: border-box; /* 패딩을 포함한 박스 크기 조정 */
`;

const SearchForm = styled.form`
  position: relative;
  width: 100%;
  /* max-width: 350px;  */
  /* 검색창의 최대 너비 설정 */
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 40px 0 10px; /* 오른쪽 패딩을 아이콘 크기만큼 늘리기 */
  border-radius: 5px;
  font-size: small;
  box-sizing: border-box; /* 패딩을 포함한 박스 크기 조정 */
  outline: none;
  border: ${({ theme }) => theme.borders.containerBorder};
  transition: border 0.25s linear;

  &:focus,
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.colors.BLACK};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.GRAY};
  transition: color 0.25s linear;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.BLACK}; /* 호버 시 색상 변경 */
  }
`;
