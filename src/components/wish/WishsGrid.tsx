import styled from "styled-components";
import WishItem from "@components/wish/WishItem";

export interface WishItemType {
  productId: number;
  title: string;
  link: string;
  image: string;
  lprice: number;
  hprice: number;
  mallName: string;
  maker: string;
  brand: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

interface WishsGridProps extends WishItemType {
  onClick: () => void;
  data: WishItemType[];
}

export default function WishsGrid({ onClick, data }: WishsGridProps) {
  return (
    <ContentsMain>
      {data.map((item) => (
        <WishItem onClick={onClick} item={item} />
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
