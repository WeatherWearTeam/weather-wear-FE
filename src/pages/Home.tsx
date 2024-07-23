
import ClothesTag from "@components/ClothesTag";
import ColorBar from "@components/ColorBar";
import ColorChip from "@components/ColorChip";
import Icon from "@components/Icon";
import { heartFillIcon, heartIcon, menuIcon } from "@shared/icons";

const Home = () => {
  return (
    <div>
      Home
      <ColorBar></ColorBar>
      <ClothesTag color="red" type="티셔츠" />
      <ColorChip color={"red"} />
      <Icon icon={menuIcon} />
      <Icon icon={heartIcon} />
      <Icon icon={heartFillIcon} />
    </div>
  );
};

export default Home;
