import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '@components/Icon';
import { searchIcon } from "@shared/icons";



export default function SearchArea() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // 검색 기능을 여기에 구현합니다.
    console.log(`Searching for: ${searchTerm}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <ContentsHeader>
      <SearchContainer>
        <SearchInput 
          placeholder="검색어를 입력하세요" 
          value={searchTerm}
          onChange={handleInputChange}
        />
        <SearchButton onClick={handleSearch}>
          <Icon icon={searchIcon} />
        </SearchButton>
      </SearchContainer>
    </ContentsHeader>
  );
}

const ContentsHeader = styled.div`
  background-color: white;
  width: 100%;
  height: 60px;
  max-width: 1090px;
  flex-shrink: 0; /* 고정된 높이 유지 */
  display: flex;

  align-items: center; /* 세로 중앙 정렬 */
  padding: 0 15px;
  box-sizing: border-box; /* 패딩을 포함한 박스 크기 조정 */
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px; /* 검색창의 최대 너비 설정 */
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 40px 0 10px; /* 오른쪽 패딩을 아이콘 크기만큼 늘리기 */
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  font-size: small;
  box-sizing: border-box; /* 패딩을 포함한 박스 크기 조정 */
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
  color: ${({ theme }) => theme.colors.gray};
  
  &:hover {
    color: ${({ theme }) => theme.colors.black}; /* 호버 시 색상 변경 */
  }

  &:focus {
    outline: none;
  }
`;