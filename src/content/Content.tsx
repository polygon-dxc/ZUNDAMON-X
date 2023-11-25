import React, { ReactElement, useEffect, useState } from 'react';

import AudioAnalyzer from '../popup/AudioAnalyzer';

import { Counter } from './features/counter';
// import getAudioData from './getAudioData';
import useAudioData from '../background/useAudioData';
import { audioDataState } from '../atom';
import { useRecoilValue } from 'recoil';
import MainFunctionCaller from './mainFunctionCaller';

const Content = (): ReactElement => {
  const { getAudioData } = useAudioData(); // useAudioDataフックを呼び出す
  const audioData = useRecoilValue(audioDataState);

  /* 動作確認用 */
  const handleClick = () => {
    getAudioData('こんにちは', 1); // useAudioDataフックを呼び出す
  };
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 999,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
      }}
    >
      <MainFunctionCaller />
      <div style={{ display: 'flex', justifyContent: 'center' }}>Content Example</div>
      <Counter />
      <button onClick={handleClick}>audio get button</button>
      <div>{audioData ? <AudioAnalyzer file={audioData[1]} /> : <p>No audio file selected</p>}</div>
    </div>
  );
};

export default Content;
