import React from 'react';
import { FadeLoader } from 'react-spinners';
import { css, cx } from 'emotion';

const loaderCenter = css`
  position:fixed;
  top:20%;
  left:50%
`;

const Loader = () => (
  <div className='modal extraFilter js-open' style={{ zIndex: '2000' }} >
    <div className={cx(loaderCenter)} role='document'>
      <FadeLoader color={'#F8A14A'} loading />
    </div>
  </div>
);

export default Loader;
