import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${Reset};

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    background-color: #eaeaea;
  }
`;

export default GlobalStyle;
