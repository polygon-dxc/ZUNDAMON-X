/*
import { useState } from 'react';
import { audioDataObject } from '../types';

// 字幕から音声ファイルの生成 + 音声データをstateに保存する処理
const useAudioData = () => {
  const [audioData, setAudioData] = useState<audioDataObject>({});

  const getAudio = (subtitle: string, start: number) => {
    fetch(
      'https://asia-northeast1-zundamon-x.cloudfunctions.net/zundamon-api-proxy/voice?message=' +
        subtitle
    )
      .then((res: Response) => {
        return res.arrayBuffer();
      })
      .then((buffer: ArrayBuffer) => {
        // 音声データの変換処理
        const wavFile = new File([buffer], 'filename.wav', { type: 'audio/wav' }); // bufferからwavファイルを作成

        setAudioData((prevData) => ({
          ...prevData,
          [`${start}`]: wavFile, // data[startの時間] = wavファイル
        }));
      });
  };

  // console.log(audioData);

  return { audioData, getAudio };
};

export default useAudioData;
*/

import { selector } from 'recoil';
import { audioDataState } from '../atom';

export const getAudioSelector = selector({
  key: 'getAudioSelector',
  get: () => {
    return (subtitle: string, start: number) => {
      fetch(
        'https://asia-northeast1-zundamon-x.cloudfunctions.net/zundamon-api-proxy/voice?message=' +
          subtitle
      )
        .then((res: Response) => res.arrayBuffer())
        .then((buffer: ArrayBuffer) => {
          /* 音声データの変換処理 */
          const wavFile = new File([buffer], 'filename.wav', { type: 'audio/wav' }); // bufferからwavファイルを作成

          // Recoilの状態を更新
          RecoilSnapshot.getLoadable(audioDataState).contents(({ set }) => {
            set(audioDataState, (prevData) => ({
              ...prevData,
              [`${start}`]: wavFile, // data[startの時間] = wavファイル
            }));
          });
        });
    };
  },
});
