import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    a{
        text-decoration: none;
        color: inherit;
    }

    *{
        box-sizing: border-box;
    }

    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;
    }
    
    ol, ul{
        list-style: none;
    }
    
    hr {
        border: none;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.main};

    }

    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
    
    body {
      font-family: "Helvetica", "Arial", sans-serif;
      line-height: 1.5;
      margin: 0;
      height: 100%;
      color:${({ theme }) => theme.colors.main};
    }

    #root {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  `;
