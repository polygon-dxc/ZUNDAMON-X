import React, { ReactElement } from 'react';

import AudioAnalyzer from './AudioAnalyzer';
import AudioAnalyzerTest from './AudioAnalyzerTest';

const Popup = (): ReactElement => {
  document.body.style.width = '15rem';
  document.body.style.height = '15rem';
  return (
    <div className="flex h-screen items-center justify-center">
      <h1>Popup</h1>
    </div>
  );
};

export default Popup;
