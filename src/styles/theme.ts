const colors = {
  white: "#FFFFFF",
  gray: "#AEAEB2",
  black: "#000000",
  red: "#FF3E3E",
  yellow: "#FFCC00",
  sand: "#EBE7DB",
  beige: "#F2D7A4",
  brown: "#B26E18",
  khaki: "#6D7F00",
  green: "#34C759",
  cyan: "#32ADE6",
  blue: "#007AFF",
  indigo: "#252497",
  purple: "#AF52DE",
  pink: "#FF6885",
  //
  main: "#5E5E5E", //메인 텍스트 컬러
  borderGray: "#A3A3A3", //버튼 보더 컬러
  borderLightGray: "#D9D9D9", //컨테이너 보더 컬러
};

const borders = {
  buttonBorder: `0.5px solid ${colors.borderGray}`,
  containerBorder: `1px solid ${colors.borderLightGray}`,
};

// const button = {};

const theme = {
  colors,
  borders,
  // button,
};

export default theme;
