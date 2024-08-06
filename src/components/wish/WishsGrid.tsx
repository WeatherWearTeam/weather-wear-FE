import styled from "styled-components";
import WishItem from "@components/wish/WishItem";

export interface WishItemType {
  id: string;
  productId: number;
  title: string;
  link: string;
  image: string;
  lprice: number;
  hprice: number;
  mallName: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  type: string;
}

interface WishsGridProps {
  onClick: () => void;
  data: WishItemType[];
  onDelete: (id: string) => void;
}

export default function WishsGrid({ onClick, data, onDelete }: WishsGridProps) {

  return (
    <ContentsMain>
      {data.map((item) => (
        <WishItem key={item.id} item={item} onClick={onClick} onDelete={onDelete} />
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
