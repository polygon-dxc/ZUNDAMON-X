import React, { ReactElement } from 'react';

import AudioAnalyzer from './AudioAnalyzer';
import AudioAnalyzerTest from './AudioAnalyzerTest';

const Popup = (): ReactElement => {
  document.body.style.width = '15rem';
  document.body.style.height = '15rem';

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage(); //Chrome拡張のオプションページに遷移
  };

  return (
    <div className="h-screen items-center justify-center">
      <h1>Popup</h1>
      <button onClick={openOptionsPage}>オプションページを開く</button>
    </div>
  );
};

export default Popup;
