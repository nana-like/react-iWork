import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${Reset};

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', 'Malgun Gothic',
  '맑은 고딕', sans-serif;

    @media (max-width: 900px) {
      font-size: 50%;
    }
  }

  body {
    font-size: 1.6rem;
    background-color: #f0f0f0;
  }

  input {
    border: 0;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', 'Malgun Gothic',
  '맑은 고딕', sans-serif;
    &:focus-visible {
      outline: 0;
    }
  }

  button {
    cursor: pointer;
  }

`;

export default GlobalStyle;
