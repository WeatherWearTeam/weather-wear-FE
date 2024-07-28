import Button from "@components/Button";
import MapContainer from "@components/Modal/MapContainer";
import ModalLayout from "@components/Modal/ModalLayout";
import ModalPortal from "@components/Modal/ModalPortal";
import useModal from "@hooks/useModal";
import styled from "styled-components";

export default function Weather() {
  const { isVisible, openModal, closeModal } = useModal();
  return (
    <Container>
      {/* <GridContainer>
        <Column></Column>
        <Column>
          <Banner></Banner>
          <Row>
            <ImageContainer />
            <ImageContainer />
            <ImageContainer />
          </Row>
        </Column>
      </GridContainer> */}
      <Button onClick={openModal}>위치 모달 열기</Button>
      {isVisible && (
        <ModalPortal>
          <ModalLayout onClose={closeModal}>
            <MapContainer onClose={closeModal} />
          </ModalLayout>
        </ModalPortal>
      )}
    </Container>
  );
}

//✅ 페이지 아웃라인
const Container = styled.div`
  /* height: calc(100vh - 7rem); */
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem 4rem 4rem;
  overflow: auto;
`;

const GridContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 3rem;
  /* @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  } */
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  min-height: 20rem;
`;

const Banner = styled.div`
  border: 1px solid yellow;
  height: 60%;
  min-height: 20rem;
`;

const Row = styled.div`
  border: 1px solid red;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* display: flex;
  flex-direction: row; */
  gap: 3rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    min-height: 67rem;
  }
`;

const ImageContainer = styled.div`
  border: 1px solid green;
  width: 100%;
  min-height: 20rem;
`;
