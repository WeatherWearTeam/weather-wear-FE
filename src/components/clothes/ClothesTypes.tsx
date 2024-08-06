import styled from "styled-components";

interface ClothesTypesProps {
  onTypeClick: (type: string) => void;
}

export default function ClothesTypes({ onTypeClick }: ClothesTypesProps) {
  const handleClick = (type: string) => {
    onTypeClick(type);
  };

  return (
    <ClothesTypeContainer>
      {['All', '나시', '티셔츠', '셔츠/블라우스', '맨투맨/후드', '니트/스웨터', '반바지', '바지/청바지', '치마', '원피스', '가디건', '아우터'].map(type => (
        <StSelectButton key={type} onClick={() => handleClick(type)}>
          <a>{type}</a>
        </StSelectButton>
      ))}
    </ClothesTypeContainer>
  );
}

const ClothesTypeContainer = styled.div`
  display: flex;
  width: 65%; 
  flex-wrap: wrap;
  gap: 0px 10px;
  border: 1px solid ${({ theme }) => theme.colors.white};;
`;

const StSelectButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 5px;
  outline: none;
  font-size: small;
  padding: 10px 10px;
  border: ${({ theme }) => theme.borders.containerBorder};
  transition: border linear 0.25s;

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
  }
`;