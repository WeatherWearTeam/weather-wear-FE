import styled from "styled-components";
import Icon from "./Icon";
import { atIcon, celsiusIcon, chatIcon, eyeIcon, hashtagIcon, heartIcon } from "@shared/icons";


function ClothesItem() {
    return (
        <ContentsItem>
            <ContentsItemImage>이미지 url</ContentsItemImage>
            <ContentsItemData>
                <ViewContainer>
                    <ViewEye><Icon icon={eyeIcon} /> 100</ViewEye>
                    <ViewHeart><Icon icon={heartIcon} /> 100</ViewHeart>
                    <ViewChat><Icon icon={chatIcon} /> 100</ViewChat>
                </ViewContainer>
                <AreaWeatherContainer>
                    <Icon icon={atIcon} />
                    대구
                    30<Icon icon={celsiusIcon} />
                    맑음
                </AreaWeatherContainer>
            </ContentsItemData>
            <ContentsItemTitle>트랜드 제목</ContentsItemTitle>
            <ContentsItemTagData>
                <HashtagWrapper><Icon icon={hashtagIcon} />오렌지 탑</HashtagWrapper>
                <HashtagWrapper><Icon icon={hashtagIcon} />블랙 바지</HashtagWrapper>
            </ContentsItemTagData>
        </ContentsItem>
    );
}

export default ClothesItem;

const ContentsItem = styled.div`
  width: 250px;
  height: 320px;
  box-sizing: border-box;
`;

const ContentsItemImage = styled.div`
  background-color: gray;
  width: 250px;
  height: 270px;
  box-sizing: border-box;
  position: relative;
`;

const ContentsItemData = styled.div`
  width: 250px;
  height: 25px;
  font-size: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const ViewEye = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  };
`;

const ViewHeart = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  };
`;

const ViewChat = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  };
`;

const AreaWeatherContainer = styled.div`
  margin-left: auto;
  display: flex;

  svg {
    width: 15px;
    height: 15px;
  };
`;

const ContentsItemTagData = styled.div`
  display: flex;
  width: 250px;
  height: 25px;
  font-size: 10px;
  box-sizing: border-box;
  gap: 10px
`;

const HashtagWrapper = styled.div`
  display: flex;

  svg {
    width: 14px;
    height: 14px;
  };
`;

const ContentsItemTitle = styled.div`
  background-color: white;
  color: black;
  width: 250px;
  height: 25px;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
  margin: 1rem 0em 0rem;
`;



