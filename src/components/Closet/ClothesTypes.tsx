import clothesTypeList from "@shared/clothesTypeList";
import { NavLink } from "react-router-dom";
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
      {clothesTypeList.map(({ key, value }) => (
        <StNavLink
          key={key}
          to={`?type=${key}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <StSelectButton
            id={key}
            name={key}
            onClick={() => handleClick(value)}
          >
            <Text>{value}</Text>
          </StSelectButton>
        </StNavLink>
      ))}
    </ClothesTypeContainer>
  );
}

const ClothesTypeContainer = styled.section`
  /* background-color: red; */
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 0 1rem;
  border: 1px solid ${({ theme }) => theme.colors.WHITE};
`;

const StSelectButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 3rem;
  outline: none;
  padding: 10px 10px;
  border: ${({ theme }) => theme.borders.containerBorder};
  transition: border linear 0.25s;

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.BLACK};
  }
`;

const Text = styled.p`
  font-size: x-small;
`;

const StNavLink = styled(NavLink)`
  transition: color 0.1s linear;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.BLACK};
    p {
      font-weight: 600;
    }
  }

  &.active {
    color: ${({ theme }) => theme.colors.BLACK};
    /* border: 1px solid ${({ theme }) => theme.colors.BLACK}; */

    ${Text} {
      font-weight: 600;
    }
  }
`;
