/**
 * CSS reset ref: https://alligator.io/css/minimal-css-reset/
 */
import React from 'react';
import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';

const GlobalStyles = (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600');

      ${emotionNormalize}
      html {
        box-sizing: border-box;
        font-size: 16px;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      ol,
      ul {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
        font-weight: normal;
      }

      img {
        max-width: 100%;
        height: auto;
      }
    `}
  />
);

export default GlobalStyles;
