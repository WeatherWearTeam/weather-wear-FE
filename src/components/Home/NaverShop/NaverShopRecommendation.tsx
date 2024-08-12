import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  useCreateWishlistItem,
  useDeleteRecommendWishlistItem,
} from "@/queries/wishlistQueries";
import LikeButton from "@components/LikeButton";
import { NaverProduct } from "@/api/wishlistApi";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";
import removeBoldTags from "@utils/removeBoldTags";
import getKoreanType from "@utils/getKoreanType";
import { ClothesType } from "@shared/clothesTypeList";

interface NaverShopRecommendationProps {
  liked: boolean[];
  toggleLike: (index: number) => void;
  data: NaverProduct[];
}

const NaverShopRecommendation: React.FC<NaverShopRecommendationProps> = ({
  liked,
  toggleLike,
  data,
}) => {
  const [wishlistIds, setWishlistIds] = useState<(number | null)[]>(
    data.map(() => null)
  );
  const { mutateCreateWishlistItem } = useCreateWishlistItem();
  const { mutateDeleteRecommendWishlistItem } =
    useDeleteRecommendWishlistItem();

  const handleLikeClick = (index: number) => {
    const updatedLiked = [...liked];
    const updatedWishlistIds = [...wishlistIds];
    updatedLiked[index] = !updatedLiked[index];
    toggleLike(index);

    const item = data[index];

    if (updatedLiked[index]) {
      //하트 눌렀을 때: 위시리스트에 생성
      mutateCreateWishlistItem(item, {
        onSuccess: (response) => {
          updatedWishlistIds[index] = response.id; // 여기서 추가된 위시리스트 항목의 ID를 저장
          setWishlistIds(updatedWishlistIds);
        },
        onError: (error) => {
          console.error("Error adding item:", error);
        },
      });
      //네이버 추천에서 삭제
      mutateDeleteRecommendWishlistItem(data[index].id);
    }
    // else {
    // console.log("---😎인덱스ㅡㅡindex", index);
    // const wishlistId = updatedWishlistIds[index];
    // if (wishlistId !== null) {
    //   mutateDeleteRecommendWishlistItem(productId, {
    //     onSuccess: () => {
    //       console.log("Item deleted successfully:", wishlistId);
    //       // updatedWishlistIds[index] = null;
    //       setWishlistIds(updatedWishlistIds);
    //     },
    //     onError: (error) => {
    //       console.error("Error deleting item:", error);
    //     },
    //   });
    // } else {
    //   console.error("No valid wishlist ID to delete.");
    // }
    // }
  };

  return (
    <HomeContents5>
      <NaverShopText>
        <HomeTitle>네이버 쇼핑에서 추천해요</HomeTitle>
        <HomeContent>
          요즘 날씨에 딱 맞는 옷을 네이버 쇼핑에서 추천해드려요!
          <br />
          마음에 드는 아이템은 하트를 눌러 위시리스트에 저장해 보세요. 편리하게
          쇼핑하고, 멋진 옷으로 스타일을 완성해보세요!
        </HomeContent>
      </NaverShopText>
      <NaverShopGrid>
        <SwiperContainer>
          <StyledSwiper
            loop={true}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              1200: { slidesPerView: 3, spaceBetween: 20 },
              980: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
            }}
            className="mySwiper"
          >
            {data.map((slide, index) => (
              <SwiperSlide key={index}>
                <NaverShopImage
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <NaverShopData>
                  <NaverShopDataInfo>
                    <TextWrapper>
                      <NaverShopDataType>
                        {getKoreanType(slide.type as ClothesType)}
                      </NaverShopDataType>
                      <NaverShopDataTitle>
                        {removeBoldTags(slide.title)}
                      </NaverShopDataTitle>
                    </TextWrapper>
                    <LikeButtonWrapper>
                      <LikeButton
                        active={liked[index]}
                        onClick={() => handleLikeClick(index)}
                      />
                    </LikeButtonWrapper>
                  </NaverShopDataInfo>
                </NaverShopData>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </SwiperContainer>
      </NaverShopGrid>
    </HomeContents5>
  );
};

export default NaverShopRecommendation;

const HomeContents5 = styled.div`
  width: 100%;
  padding: 3rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
///////////////////////////////////////////////////

const NaverShopText = styled.div`
  width: 100%;
  grid-area: a;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HomeTitle = styled.div`
  font-size: xx-large;
  color: black;
  font-weight: bold;
`;

const HomeContent = styled.div`
  font-size: medium;
`;
///////////////////////////////////////////////////

const NaverShopGrid = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: 1090px;
  grid-template-rows: 300px auto;
  grid-template-areas:
    "slider"
    "a";
  gap: 3rem;
  @media (max-width: 1200px) {
    grid-template-columns: 840px;
  }

  @media (max-width: 980px) {
    grid-template-columns: 660px;
    grid-template-areas:
      "slider"
      "a";
  }

  @media (max-width: 768px) {
    grid-template-columns: 300px;
    grid-template-rows: auto auto;
    grid-template-areas:
      "slider"
      "a";
  }
`;

const SwiperContainer = styled.div`
  grid-area: slider;
  width: 100%;
  height: 100%;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 32rem;

  .swiper-button-next,
  .swiper-button-prev {
    color: black;
    text-shadow: 0px 0px 5px white;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const NaverShopImage = styled.div`
  position: relative;
  background-color: gray;
  background-size: cover;
  background-position: center;
  height: 25rem;
  width: 100%;
  border: ${({ theme }) => theme.borders.containerBorder};
`;

const NaverShopData = styled.div`
  /* height: 0; */
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 12px;
`;

const NaverShopDataInfo = styled.div`
  border: ${({ theme }) => theme.borders.containerBorder};
  background-color: white;
  width: 100%;
  color: black;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const NaverShopDataType = styled.div`
  font-size: 12px;
  box-sizing: border-box;
`;

const NaverShopDataTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4rem;
`;

const LikeButtonWrapper = styled.div`
  border-left: ${({ theme }) => theme.borders.containerBorder};
  padding: 1rem 0 1rem 1rem;
`;
