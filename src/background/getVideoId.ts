import React, { useEffect, useState } from 'react';

//カスタムフックを使用
function useGetVideoId() {
  const [url, setUrl] = useState<string>();
  const [videoId, setVideoId] = useState<string>();

  useEffect(() => {
    // Query for the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      setUrl(url);
      const videoId = url?.split('v=')[1].split('&')[0];
      setVideoId(videoId);
    });
  }, []);

  return videoId;
}

export default useGetVideoId;
