import { useState } from 'react';

type Props = {
  [startTime: string]: File;
};

const useAudioData = () => {
  const [data, setData] = useState<Props>({});

  const getAudio = (subtitle: string, start: number) => {
    fetch(
      'https://asia-northeast1-zundamon-x.cloudfunctions.net/zundamon-api-proxy/voice?message=' +
        subtitle
    )
      .then((res: Response) => {
        return res.arrayBuffer();
      })
      .then((buffer: ArrayBuffer) => {
        /* 音声データの変換処理 */
        const wavFile = new File([buffer], 'filename.wav', { type: 'audio/wav' }); // bufferからwavファイルを作成

        setData((prevData) => ({
          ...prevData,
          [`${start}`]: wavFile, // data[startの時間] = wavファイル
        }));
      });
  };

  console.log(data);

  return { data, getAudio };
};

export default useAudioData;
