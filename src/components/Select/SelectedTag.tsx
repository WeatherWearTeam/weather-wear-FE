import ColorChip from "@components/Color/ColorChip";
import Icon from "@components/Icon";
import { ClothesKoreanType } from "@shared/clothesTypeList";
import { ClothesColorType } from "@shared/colorTypeList";
import { closeIcon } from "@shared/icons";
import styled from "styled-components";

interface SelectedTagProps {
  color: ClothesColorType;
  selectedTypeOption: ClothesKoreanType | "옷 종류" | null;
  id: number;
  onRemoveTag: (id: number) => void;
}
export default function SelectedTag({
  color,
  selectedTypeOption,
  id,
  onRemoveTag,
}: SelectedTagProps) {
  return (
    <Container>
      <TagContainer>
        <ColorChip color={color} />
        {selectedTypeOption}
      </TagContainer>
      <button type="button" onClick={() => onRemoveTag(id)}>
        <Icon icon={closeIcon} />
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: ${({ theme }) => theme.borders.containerBorder};
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  font-size: small;
`;
