import { css } from "styled-components";

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
  back: "#2C2C2C",
};

const borders = {
  buttonBorder: `0.5px solid ${colors.borderGray}`,
  containerBorder: `1px solid ${colors.borderLightGray}`,
};

const buttons = {
  primary: {
    backgroundColor: `${colors.black}`,
    border: `1px solid ${colors.black}`,
    color: `${colors.white}`,

    hover: css`
      background-color: ${colors.white};
      border: 1px solid ${colors.black};
      color: ${colors.black};
    `,
    focus: css`
      background-color: ${colors.white};
      border: 1px solid ${colors.black};
      color: ${colors.black};
    `,
  },
  secondary: {
    backgroundColor: `${colors.white}`,
    border: `${borders.containerBorder}`,
    hover: css`
      border: 1px solid ${colors.black};
      color: ${colors.black};
    `,
    focus: css`
      border: 1px solid ${colors.black};
      color: ${colors.black};
    `,
  },
};

//아바타 사이즈
const size = {
  s: {
    width: "3rem",
    height: "3rem",
  },
  m: {
    width: "4rem",
    height: "4rem",
  },
  lg: {
    width: "5rem",
    height: "5rem",
  },
  xl: {
    width: "12rem",
    height: "12rem",
  },
};

const theme = {
  colors,
  borders,
  buttons,
  size,
};

export default theme;
