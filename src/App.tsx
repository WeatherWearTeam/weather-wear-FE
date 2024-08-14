import { GlobalStyle } from "@styles/global-style";
import { ThemeProvider } from "styled-components";
import Router from "@shared/Router";
import theme from "@styles/theme";
// import SEOMetaTag from "@shared/SEOMetaTag";

function App() {
  // console.log("🌱 현재 환경:", import.meta.env.MODE);
  return (
    <ThemeProvider theme={theme}>
      {/* <SEOMetaTag props></SEOMetaTag> */}
      <Router />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
