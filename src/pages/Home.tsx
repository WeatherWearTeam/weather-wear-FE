import styled from "styled-components";
import MyOOTDGrid from "@components/MyOOTDGrid";
import ClothesTag from "@components/ClothesTag";
import ClothesType from "@components/ClothesTypes";
import ColorBar from "@components/ColorBar";
import ColorChip from "@components/ColorChip";
import Icon from "@components/Icon";
import { heartFillIcon, heartIcon, menuIcon } from "@shared/icons";

type buttonType = "primary" | "secondary";

interface buttonsProps {
  $buttonType?: buttonType;
  $selected?: boolean;
}

const Home = () => {
  return (
    <HomeContainer>
      Home
      <ColorBar></ColorBar>
      <ClothesTag color="red" type="티셔츠" />
      <ColorChip color={"red"} />
      <Icon icon={menuIcon} />
      <Icon icon={heartIcon} />
      <Icon icon={heartFillIcon} />
      <ClothesType />

      <HomeContents3>
        <Divider />
        <HomeTitle>
          My OOTD 추천
        </HomeTitle>
        <HomeContentContainer>
          <HomeContent>
            오늘 날씨에는 내 옷장의 이런 옷들을 추천합니다!<br />
            더 다양한 스타일 추천을 원한다면 옷을 추가해주세요!
          </HomeContent>
          <MyCloset>
            내 옷장 바로가기
          </MyCloset>
        </HomeContentContainer>
        <MyOOTDGrid />
      </HomeContents3>

      <HomeContents4>
        <Divider />
        <TredndGrid>
          <TredndImage1></TredndImage1>
          <TredndText>
            <HomeTitle>OOTD Trend 추천</HomeTitle>
            <HomeContent>
              오늘 다른 사람들은 어떻게 입었을 까요?<br />
              오늘의 인기있는 OOTD 트랜드를 확인해보세요!
            </HomeContent>
            <TrendMore>MORE</TrendMore>
          </TredndText>
          <TredndImage2></TredndImage2>
          <TredndImage3></TredndImage3>
          <TredndImage4></TredndImage4>
        </TredndGrid>
      </HomeContents4>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const HomeContents3 = styled.div`
  width: 80%;
  height: 400px;
  flex-direction: column;
  position: static;
  margin: 40px 0;
`;

const HomeTitle = styled.div`
  font-size: 3rem;
  color: black;
  font-weight: bold;
  
  // background-color: pink;
`;

const HomeContentContainer = styled.div`
  width:100%;
  height:50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // background-color: green;
`;

const HomeContent = styled.div`
  font-size: 1.3rem;
`;

const MyCloset = styled.button<buttonsProps>`
  background-color: ${({ theme, $buttonType = "secondary" }) =>
    theme.buttons[$buttonType].backgroundColor};
  border: ${({ theme, $buttonType = "secondary" }) =>
    theme.buttons[$buttonType].border || "inherit"};
  color: ${({ theme, $buttonType = "secondary" }) =>
    theme.buttons[$buttonType].color || "inherit"};
  width: 150px;
  height: 35px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s; /* 색상 전환 추가 */
  outline: none;

  &:hover {
    background-color: ${({ theme, $buttonType = "secondary" }) =>
    $buttonType === "secondary" ? theme.colors.black : theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme, $buttonType = "secondary" }) =>
    $buttonType === "secondary" ? theme.colors.white : theme.colors.black};
  }
  
  &:focus {
    background-color: ${({ theme, $buttonType = "secondary" }) =>
    $buttonType === "secondary" ? theme.colors.black : theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme, $buttonType = "secondary" }) =>
    $buttonType === "secondary" ? theme.colors.white : theme.colors.black};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  margin: 20px 0;
`;

const HomeContents4 = styled.div`
  width: 80%;
  height: 400px;
  flex-direction: column;
  position: static;
  margin: 40px 0;
`;

const TredndGrid = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(5, 200px);
  grid-gap: 20px;
  grid-template-rows: 200px 250px;
  grid-template-areas: 
      'a a b b b '
      'a a c d e '
`;

const TredndImage1 = styled.div`
  grid-area: a;
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;

const TredndText = styled.div`
  grid-area: b;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 
  text-align: center; /* 텍스트 중앙 정렬 */
  gap: 12px;
`;

const TrendMore = styled.button<buttonsProps>`
  background-color: ${({ theme, $buttonType = "primary" }) =>
    theme.buttons[$buttonType].backgroundColor};
  border: ${({ theme, $buttonType = "primary" }) =>
    theme.buttons[$buttonType].border || "inherit"};
  color: ${({ theme, $buttonType = "primary" }) =>
    theme.buttons[$buttonType].color || "inherit"};
  width: 100px;
  height: 38px;
  cursor: pointer;
  border-radius: 30px;
  transition: background-color 0.2s, border-color 0.2s; /* 배경색 전환 추가 */
  outline: none;

  &:hover {
    background-color: ${({ theme, $buttonType = "primary" }) =>
    $buttonType === "secondary" ? theme.colors.black : theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
  }
  
  &:focus {
    background-color: ${({ theme, $buttonType = "primary" }) =>
    $buttonType === "secondary" ? theme.colors.black : theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const TredndImage2 = styled.div`
  grid-area: c;
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;
const TredndImage3 = styled.div`
  grid-area: d;
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;
const TredndImage4 = styled.div`
  grid-area: e;
  background-color: gray;
  box-sizing: border-box;
  border-radius: 10px;
`;
