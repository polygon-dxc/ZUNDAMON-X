import React, { useEffect, useState } from 'react';

import getTranscript from '../background/getTranscript';
import useGetVideoId from '../background/useGetVideoId'; // useGetVideoIdのインポートを忘れずに
import { getTranscriptResponseType, videoidtype } from '../types';

function TranscriptComponent() {
  /*
  const [transcript, setTranscript] = useState<getTranscriptResponseType[]>([]);
  const videoId: videoidtype = {
    videoId: useGetVideoId() || '',
  };
  // useGetVideoIdを使用してvideoIdを取得

  useEffect(() => {
    const fetchTranscript = async () => {
      const result = await getTranscript(videoId);
      setTranscript(result);
      console.log(result);
    };
    if (videoId) fetchTranscript(); // videoIdがundefinedでないときだけfetchTranscriptを実行
  }, [videoId.videoId]); // re-run the effect when `videoId` changes

  // handleClick関数はもはや不要です。その代わりに、useGetVideoIdの結果が変更されたときにuseEffectフックが自動的に再実行されます。

  return (
    <div>
      {transcript.map((item, index) => (
        <p key={index}>
          {item.text}, {item.start}, {item.duration}
        </p>
      ))}
      //次のように特定の字幕のtimeを指定
      {transcript[2]?.start}
    </div>
  );
  */
}

export default TranscriptComponent;
