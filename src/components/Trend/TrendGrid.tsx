import styled from "styled-components";
import { TrendItemResponse } from "@api/trendApi";
import TrendItem from "@/components/Trend/TrendItem";

interface TrendGridProps {
  trendItemsData: TrendItemResponse[][]; //배열을 또 배열로 감싼 형태로 내려오는 중임
}
const TrendGrid = ({ trendItemsData }: TrendGridProps) => {
  return (
    <MainContainer>
      {trendItemsData?.map((page: TrendItemResponse[], index: number) => (
        <PageContainer key={index}>
          {page?.map((item: TrendItemResponse) => (
            <TrendItem key={item.id} item={item} />
          ))}
        </PageContainer>
      ))}
    </MainContainer>
  );
};

export default TrendGrid;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  //8개 한 페이지씩 한 세트
`;

const PageContainer = styled.div`
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
