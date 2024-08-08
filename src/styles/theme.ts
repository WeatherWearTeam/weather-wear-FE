import { css } from "styled-components";

const colors = {
  WHITE: "#FFFFFF",
  GRAY: "#AEAEB2",
  BLACK: "#000000",
  RED: "#FF3E3E",
  YELLOW: "#FFCC00",
  SAND: "#EBE7DB",
  BEIGE: "#F2D7A4",
  BROWN: "#B26E18",
  KHAKI: "#6D7F00",
  GREEN: "#34C759",
  CYAN: "#32ADE6",
  BLUE: "#007AFF",
  INDIGO: "#252497",
  PURPLE: "#AF52DE",
  PINK: "#FF6885",
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
    backgroundColor: `${colors.BLACK}`,
    border: `1px solid ${colors.BLACK}`,
    color: `${colors.WHITE}`,

    hover: css`
      background-color: ${colors.WHITE};
      border: 1px solid ${colors.BLACK};
      color: ${colors.BLACK};
    `,
    focus: css`
      background-color: ${colors.WHITE};
      border: 1px solid ${colors.BLACK};
      color: ${colors.BLACK};
    `,
  },
  secondary: {
    backgroundColor: `${colors.WHITE}`,
    border: `${borders.containerBorder}`,
    hover: css`
      border: 1px solid ${colors.BLACK};
      color: ${colors.BLACK};
    `,
    focus: css`
      border: 1px solid ${colors.BLACK};
      color: ${colors.BLACK};
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
