import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${Reset};
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Segoe UI', 'Malgun Gothic',
  '맑은 고딕', sans-serif;
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
