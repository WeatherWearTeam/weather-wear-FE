import styled from "styled-components";
import WishItem from "@components/wish/WishItem";
import { WishlistItem } from "@api/wishlistApi";


interface WishsGridProps {
  onClick: (id: number) => void;
  data: WishlistItem[];
  onDelete: (id: number) => void;
}

export default function WishsGrid({ onClick, data, onDelete }: WishsGridProps) {
  console.log(data)
  return (
    <ContentsMain>
      {data.map((item) => (
        <WishItem key={item.id} item={item.product} onClick={() => onClick(item.id)} onDelete={() =>onDelete(item.id)} />
      ))}
    </ContentsMain>
  );
}

const ContentsMain = styled.div`
  width: 85%;
  max-width: 1090px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 30px;
  padding: 20px 0 15px 0;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 2fr);
  }
  // @media (max-width: 900px) {grid-template-columns: repeat(2, 2fr);}
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
