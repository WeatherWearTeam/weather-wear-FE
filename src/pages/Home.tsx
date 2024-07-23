import ClothesTag from "@components/ClothesTag";
import ColorBar from "@components/ColorBar";
import ColorChip from "@components/ColorChip";

const Home = () => {
  return (
    <div>
      Home
      <ColorBar></ColorBar>
      <ClothesTag color="red" type="티셔츠" />
      <ColorChip color={"red"} />
    </div>
  );
};

export default Home;
