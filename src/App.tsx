import { GlobalStyle } from "@styles/global-style";
import { ThemeProvider } from "styled-components";
import Router from "@shared/Router";
import theme from "@styles/theme";

function App() {
  console.log("🌱 현재 개발 환경:", import.meta.env.MODE);
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
