import React, { ReactElement } from 'react';

const Popup = (): ReactElement => {
  document.body.style.width = '15rem';
  document.body.style.height = '15rem';

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage(); //Chrome拡張のオプションページに遷移
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <h1>Popup</h1>
      <div>
        <button onClick={openOptionsPage}>オプションページを開く</button>
      </div>
    </div>
  );
};

export default Popup;
