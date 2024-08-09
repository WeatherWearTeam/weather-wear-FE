export const getSkyState = (SKY: number) => {
  switch (SKY) {
    case 1:
      return "맑음";
    case 2:
      return "구름조금";
    case 3:
      return "구름많음";
    case 4:
      return "흐림";
    default:
      1;
      break;
  }
};

export const getPtyState = (PTY: number) => {
  switch (PTY) {
    case 0:
      return "비 소식 없음";
    case 1:
      return "비";
    case 2:
      return "비와 눈";
    case 3:
      return "눈";
    case 4:
      return "소나기";
    default:
      0;
      break;
  }
};
