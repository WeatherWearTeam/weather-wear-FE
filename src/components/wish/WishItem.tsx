import { NaverProduct } from "@api/wishlistApi";
import removeBoldTags from "@utils/removeBoldTags";
import styled from "styled-components";

interface WishItemProps {
  item: NaverProduct;
  onClick: (id: string) => void;
}

function WishItem({ item, onClick }: WishItemProps) {
  return (
    <ContentsItem>
      <ImageWrapper>
        <ContentsItemImage
          src={item.image}
          alt={"wishlist item image"}
          onClick={() => {
            onClick(`${item.id}`);
          }}
        />
      </ImageWrapper>

      <ItemDataContainer>
        <ItemType>{item.category3}</ItemType>
      </ItemDataContainer>

      <ProductInfoWrapper>
        <ItemTitle>{removeBoldTags(item.title)}</ItemTitle>
      </ProductInfoWrapper>
    </ContentsItem>
  );
}

export default WishItem;

const ContentsItem = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  width: 25rem;
  height: 30rem;
  /* width: 100%;
  height: 100%; */
  box-sizing: border-box;
  position: relative;
  /* padding: 2rem; */
  border: ${({ theme }) => theme.borders.containerBorder};
  @media (max-width: 600px) {
    width: 100%;
    height: 50rem;
  }
`;

const ContentsItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
`;

const ItemDataContainer = styled.div`
  padding-top: 1rem;
  font-size: small;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ItemType = styled.p`
  font-size: small;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemTitle = styled.h2`
  font-size: medium;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 25rem;
`;

// const ContentsItemPrice = styled.div`
//   color: black;
//   width: 85px;
//   height: 25px;
//   margin-left: 20px;
//   font-size: small;
//   font-weight: bold;
// `;
