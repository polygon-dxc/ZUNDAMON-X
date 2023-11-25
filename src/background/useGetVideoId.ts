import React, { useEffect, useState } from 'react';

import { videoidtype } from '../types';

//* videoIDの取得
function useGetVideoId() {
  const [url, setUrl] = useState<string>();
  const [videoIdInfo, setVideoIdInfo] = useState<videoidtype>({ videoId: '' });

  useEffect(() => {
    const unsubscribe = setInterval(() => {
      const url = window.location.href;
      console.log('url is', url);
      setUrl(url);
      const videoId = url?.split('v=')[1]?.split('&')[0];
      if (typeof videoId === 'string') {
        setVideoIdInfo({ videoId: videoId }); // Update the whole object
      }
      // });
    }, 1000);
    return () => {
      //タイマーを消す
      clearInterval(unsubscribe);
    };
  }, []);

  return videoIdInfo;
}

export default useGetVideoId;
