import { useEffect, useState } from 'react';

const useAudioData = (subtitle: string, start: number) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('http://35.189.143.254/voice?message=' + subtitle)
      .then((res: Response) => res.arrayBuffer())
      .then((buffer: ArrayBuffer) => {
        /* 音声データの変換処理 */
        /* blobを使用する場合 */
        const blob = new Blob([buffer], { type: 'audio/wav' }); // Blobはバイナリデータを扱うためのオブジェクト
        const url = URL.createObjectURL(blob); // blobから音声のURLを作成
        const audio = new Audio(); // Audioオブジェクトを作成
        audio.src = url; // URLを指定
        const audioFile = new File([blob], 'filename.wav', { type: 'audio/wav' }); // blobから音声ファイルを作成

        /* bufferを使用する場合 */
        const wavFile = new File([buffer], 'filename.wav', { type: 'audio/wav' }); // bufferからwavファイルを作成
        const wavUrl = URL.createObjectURL(wavFile); // wavファイルからURLを作成

        /* 音声データの保存処理 */
        // URLからファイル名を取得
        const fileName = url.split('/').pop();
        // ファイル名から拡張子を取得
        const ext = fileName?.split('.').pop();
        // ファイル名から拡張子を除いた名前を取得
        const name = fileName?.replace('.' + ext, '');
        // ファイル名を指定
        const fileNameWithExt = name + '.wav';

        setData((prevData) => ({
          ...prevData,
          [subtitle]: { voice: blob, startTime: start },
        }));
      });
  }, [subtitle, start]); //subtitleとstartが変更されたら再レンダリング
};

export default useAudioData;
