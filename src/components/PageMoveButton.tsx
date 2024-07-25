import styled from "styled-components";
import Icon from "@components/Icon";
import { arrowLeftIcon, arrowRightIcon } from "@shared/icons";


export default function PageMoveButton() {
  return (
    <FooterButtons>
      <PreviousButton>
        <Icon icon={arrowLeftIcon} />
      </PreviousButton>
      <NextButton>
        <Icon icon={arrowRightIcon} />
      </NextButton>
    </FooterButtons>
  )
}

const FooterButtons = styled.div`
  display: flex;
  gap: 5px;
  margin: 0 auto;
`;

const FooterButton = styled.button`
  width: 23px;
  height: 23px;
  background-color: white;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
`;

const PreviousButton = styled(FooterButton)`
  margin-left: 35px;

  svg {
    width: 20px;
    height: 20px;
  };
`;

const NextButton = styled(FooterButton)`
  svg {
    width: 20px;
    height: 20px;
  };
`;
