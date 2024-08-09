import Icon from "@components/Icon";
import { arrowLeftIcon, arrowRightIcon } from "@shared/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  totalPages: number;
  pageCount: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  totalPages,
  pageCount, //5페이지씩 보여주기 =5
  currentPage,
  onPageChange,
}: Props) {
  // const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <Wrapper>
      <List>
        <Move invisible={noPrev}>
          <LinkDivButton
            to={`?page=${start - 1}`}
            onClick={() => onPageChange(start - 1)}
          >
            <PreviousButton>
              <Icon icon={arrowLeftIcon} />
            </PreviousButton>
          </LinkDivButton>
        </Move>
        {[...Array(pageCount)].map((_, i) => (
          <>
            {start + i <= totalPages && (
              <Page key={i} active={currentPage === start + i}>
                <LinkDiv
                  to={`?page=${start + i}`}
                  onClick={() => onPageChange(start + i)}
                >
                  {start + i}
                </LinkDiv>
              </Page>
            )}
          </>
        ))}
        <Move invisible={noNext}>
          <LinkDivButton
            to={`?page=${start + pageCount}`}
            onClick={() => onPageChange(start + pageCount)}
          >
            <NextButton>
              <Icon icon={arrowRightIcon} />
            </NextButton>
          </LinkDivButton>
        </Move>
      </List>
    </Wrapper>
  );
}
// Wrapper 스타일 정의
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: #888;
`;

// List 스타일 정의
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

// ListItem 스타일 정의
const ListItem = styled.li`
  float: left;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Move = styled(ListItem)<{ invisible: boolean }>`
  position: relative;
  cursor: pointer;
  margin: 0 10px;
  visibility: ${({ invisible }) => (invisible ? "hidden" : "visible")};

  /* a {
    width: 50px;
    display: block;
    z-index: 10;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  } */
`;

const Page = styled(ListItem)<{ active: boolean }>`
  margin: 0 5px;
  cursor: pointer;
  width: 4rem;
  border-radius: 30px;
  text-align: center;
  font-weight: ${({ active }) => (active ? "700" : "normal")};
  background: ${({ active }) => (active ? "black" : "none")};
  color: ${({ active }) => (active ? "white" : "inherit")};
  border: 1px solid transparent;
  transition: border 0.15s linear;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.main};
  }
`;

const LinkDiv = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: medium;
`;

const LinkDivButton = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: medium;
`;

const PreviousButton = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: white;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  svg {
    width: 20px;
    height: 20px;
  }

  transition: border 0.15s linear;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.main};
  }
`;

const NextButton = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: white;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  svg {
    width: 20px;
    height: 20px;
  }

  transition: border 0.15s linear;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.main};
  }
`;
