import { useSetRecoilState } from 'recoil';
import { audioDataState } from '../atom';
import { audioDataObject } from '../types';

//* 字幕から音声ファイルの生成 -> 音声データをstateに保存する処理
const useAudioData = () => {
  const setAudioData = useSetRecoilState<audioDataObject>(audioDataState); // recoilのstateに保存する関数
  const getAudioData = (subtitle: string, start: number) => {
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

        // recoilのstateに保存
        setAudioData((prevData) => ({
          ...prevData,
          [`${start}`]: wavFile, // data[startの時間] = wavファイル
        }));
      });
  };

  return { getAudioData };
};

export default useAudioData;
