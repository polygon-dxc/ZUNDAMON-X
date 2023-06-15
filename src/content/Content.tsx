import React, { ReactElement } from 'react';

import AudioAnalyzer from '../popup/AudioAnalyzer';

import { Counter } from './features/counter';
import getAuidoData from './getAudioData';
import { audioDataState } from '../atom';
import { useRecoilValue } from 'recoil';

const Content = (): ReactElement => {
  // const { audioData, getAudio } = useAudioData();
  const audioData = useRecoilValue(audioDataState);

  /* 動作確認用 */
  const handleClick = () => {
    getAuidoData('こんにちは', 1); // useAudioDataフックを呼び出す
  };

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 999,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgb(0 0 0 / 30%)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>Content Example</div>
      <Counter />
      <button onClick={handleClick}>audio get button</button>
      <div>{audioData ? <AudioAnalyzer file={audioData[1]} /> : <p>No audio file selected</p>}</div>
    </div>
  );
};

export default Content;
