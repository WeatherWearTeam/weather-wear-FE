import styled from "styled-components";
import PageMoveButton from "@components/PageMoveButton";
import AddButton from "@components/AddButton";
import ColorBar from "@components/ColorBar";
import ClothesType from "@components/clothes/ClothesTypes";
import WishsGrid from "@components/wish/WishsGrid";
import useModal from "@hooks/useModal";
import ModalPortal from "@components/Modal/ModalPortal";
import ModalLayout from "@components/Modal/ModalLayout";
import WishDetail from "@pages/WishDetail";

function Wish() {
  const { isVisible, openModal, closeModal } = useModal();

  const mockWishItems = [
    {
      productId: 1, //Integer
      title: "반팔 티셔츠 루룰루루",
      link: "#링크",
      image: "이미지",
      lprice: 10000, //Integer
      hprice: 0, //Integer
      mallName: "네이버",
      maker: "제조사",
      brand: "브랜드",
      category1: "대분류",
      category2: "중분류",
      category3: "소분류",
      category4: "세분류",
    },
    {
      productId: 2, //Integer
      title: "반팔 티셔츠 루룰루루",
      link: "#링크",
      image: "이미지",
      lprice: 10000, //Integer
      hprice: 0, //Integer
      mallName: "네이버",
      maker: "제조사",
      brand: "브랜드",
      category1: "대분류",
      category2: "중분류",
      category3: "소분류",
      category4: "세분류",
    },
    {
      productId: 3, //Integer
      title: "반팔 티셔츠 루룰루루",
      link: "#링크",
      image: "이미지",
      lprice: 10000, //Integer
      hprice: 0, //Integer
      mallName: "네이버",
      maker: "제조사",
      brand: "브랜드",
      category1: "대분류",
      category2: "중분류",
      category3: "소분류",
      category4: "세분류",
    },
    {
      productId: 4, //Integer
      title: "반팔 티셔츠 루룰루루",
      link: "#링크",
      image: "이미지",
      lprice: 10000, //Integer
      hprice: 0, //Integer
      mallName: "네이버",
      maker: "제조사",
      brand: "브랜드",
      category1: "대분류",
      category2: "중분류",
      category3: "소분류",
      category4: "세분류",
    },
    {
      productId: 5, //Integer
      title: "반팔 티셔츠 루룰루루",
      link: "#링크",
      image: "이미지",
      lprice: 10000, //Integer
      hprice: 0, //Integer
      mallName: "네이버",
      maker: "제조사",
      brand: "브랜드",
      category1: "대분류",
      category2: "중분류",
      category3: "소분류",
      category4: "세분류",
    },
    {
      productId: 6, //Integer
      title: "반팔 티셔츠 루룰루루",
      link: "#링크",
      image: "이미지",
      lprice: 10000, //Integer
      hprice: 0, //Integer
      mallName: "네이버",
      maker: "제조사",
      brand: "브랜드",
      category1: "대분류",
      category2: "중분류",
      category3: "소분류",
      category4: "세분류",
    },
    {
      productId: 7, //Integer
      title: "반팔 티셔츠 루룰루루",
      link: "#링크",
      image: "이미지",
      lprice: 10000, //Integer
      hprice: 0, //Integer
      mallName: "네이버",
      maker: "제조사",
      brand: "브랜드",
      category1: "대분류",
      category2: "중분류",
      category3: "소분류",
      category4: "세분류",
    },
    {
      productId: 8, //Integer
      title: "반팔 티셔츠 루룰루루",
      link: "#링크",
      image: "이미지",
      lprice: 10000, //Integer
      hprice: 0, //Integer
      mallName: "네이버",
      maker: "제조사",
      brand: "브랜드",
      category1: "대분류",
      category2: "중분류",
      category3: "소분류",
      category4: "세분류",
    },
  ];

  return (
    <MypageContentsContainer>
      <ContentsHeader>
        <ClothesType />
        <ColorBar />
      </ContentsHeader>
      <ContentsMain>
        <WishsGrid onClick={openModal} data={mockWishItems}/>
      </ContentsMain>
      <ContentsFooter>
        <PageMoveButton />
        {isVisible && (
          <ModalPortal>
            <ModalLayout onClose={closeModal}>
              <WishDetail />
            </ModalLayout>
          </ModalPortal>
        )}
      </ContentsFooter>
    </MypageContentsContainer>
  );
}

export default Wish;

const MypageContentsContainer = styled.div`
  width: 100%;
  height: 80vh;
  position: fixed;
  top: 175px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  overflow-y: auto;
`;

const ContentsHeader = styled.div`
  background-color: white;
  width: 100%;
  height: 60px;
  max-width: 1090px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
`;

const ContentsFooter = styled.div`
  width: 85%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  max-width: 1220px;
  flex-shrink: 0;
`;

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
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
