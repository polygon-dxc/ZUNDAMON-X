//* ボタンを押したときにaudioDataを取得する 動作確認用
//todo テスト用のコンポーネントなので削除する

import React, { ReactElement, useEffect, useState } from 'react';

import AudioAnalyzer from '../popup/AudioAnalyzer';

import { Counter } from './features/counter';
import useAudioData from '../background/useAudioData';
import { audioDataState } from '../atom';
import { useRecoilValue } from 'recoil';
import MainFunctionCaller from './mainFunctionCaller';

const Content = (): ReactElement => {
  const { getAudioData } = useAudioData(); // useAudioDataフックを呼び出す
  const audioData = useRecoilValue(audioDataState);

  const handleClick = () => {
    getAudioData('こんにちは', 1);
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
