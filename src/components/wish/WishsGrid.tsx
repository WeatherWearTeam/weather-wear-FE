import styled from "styled-components";
import WishItem from "@components/wish/WishItem";
import { WishlistItem } from "@api/wishlistApi";
import Icon from "@components/Icon";
import { closeIcon } from "@shared/icons";

interface WishsGridProps {
  onClick: (id: number) => void;
  data: WishlistItem[];
  onDelete: (id: number) => void;
}

export default function WishsGrid({ onClick, data, onDelete }: WishsGridProps) {
  return (
    <ContentsMain>
      {data.map((item) => (
        <ItemWrapper key={item.id}>
          <WishItem
            key={item.id}
            item={item.product}
            onClick={() => onClick(item.id)}
          />
          <ButtonWrapper onClick={() => onDelete(item.id)}>
            <Icon icon={closeIcon} />
          </ButtonWrapper>
        </ItemWrapper>
      ))}
    </ContentsMain>
  );
}

const ContentsMain = styled.div`
  /* max-width: 1090px; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 2rem;
  padding: 0 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ItemWrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 2.5rem;
  right: 0.2rem;
  cursor: pointer;
  right: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: background-color 0.25s;
  cursor: pointer;

  &:hover,
  &:focus,
  &:focus-visible {
    color: white;
    background-color: ${({ theme }) => theme.colors.RED};
  }
`;
