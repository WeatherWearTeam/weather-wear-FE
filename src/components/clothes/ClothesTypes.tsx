import styled from "styled-components";




export default function ClothesTypes() {
    return (
        <ClothesTypeContainer>
            <StSelectButton><a>All</a></StSelectButton>
            <StSelectButton><a>나시</a></StSelectButton>
            <StSelectButton><a>티셔츠</a></StSelectButton>
            <StSelectButton><a>셔츠/블라우스</a></StSelectButton>
            <StSelectButton><a>맨투맨/후드</a></StSelectButton>
            <StSelectButton><a>니트/스웨터</a></StSelectButton>
            <StSelectButton><a>반바지</a></StSelectButton>
            <StSelectButton><a>바지/청바지</a></StSelectButton>
            <StSelectButton><a>치마</a></StSelectButton>
            <StSelectButton><a>원피스</a></StSelectButton>
            <StSelectButton><a>가디건</a></StSelectButton>
            <StSelectButton><a>아우터</a></StSelectButton>
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