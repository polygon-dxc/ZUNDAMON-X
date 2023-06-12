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
        // setData((prevData) => ({
        //   ...prevData,
        //   [`${start}`]: res.url, // data[startの時間] = wavファイルのURL
        // }));

        return res.arrayBuffer();
      })
      .then((buffer: ArrayBuffer) => {
        /* 音声データの変換処理 */

        /* blobを使用する場合 */
        // const blob = new Blob([buffer], { type: 'audio/wav' }); // Blobはバイナリデータを扱うためのオブジェクト
        // const url = URL.createObjectURL(blob); // blobから音声のURLを作成
        // const audio = new Audio(); // Audioオブジェクトを作成
        // audio.src = url; // URLを指定
        // const audioFile = new File([blob], 'filename.wav', { type: 'audio/wav' }); // blobから音声ファイルを作成

        /* bufferを使用する場合 */
        const wavFile = new File([buffer], 'filename.wav', { type: 'audio/wav' }); // bufferからwavファイルを作成

        setData((prevData) => ({
          ...prevData,
          [`${start}`]: wavFile, // data[startの時間] = wavファイルのURL
        }));
      });
  };

  console.log(data);

  return { data, getAudio };
};

export default useAudioData;
