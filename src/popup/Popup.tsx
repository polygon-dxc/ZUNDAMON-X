import React, { ReactElement } from 'react';

import MainFunctionCaller from '../content/mainFunctionCaller';

import AudioAnalyzer from './AudioAnalyzer';
import AudioAnalyzerTest from './AudioAnalyzerTest';

const Popup = (): ReactElement => {
  document.body.style.width = '18rem';
  document.body.style.height = '10rem';

  return (
    <div className="h-screen items-center justify-center">
      <MainFunctionCaller />
    </div>
  );
};

export default Popup;
