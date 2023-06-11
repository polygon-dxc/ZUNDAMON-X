/* アクティブなタブを取得し、そのタブに対してスクリプトを実行する */
const scripting = async (onRun: () => number | boolean) => {
  const [tab] = await chrome.tabs.query({
    //アクティブなタブを取得
    active: true,
    currentWindow: true,
  });
  /* 取得したタブに対してスクリプトを実行 */
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id || 0 },
      func: onRun,
    })
    .then((result) => {
      // promiseで成功した時の処理
      return result[0].result;
    });
};

/* 現在の再生時刻を取得 */
export const getVideoCurrentTime = () => {
  const videoCurrentTime = () => {
    const video = document.getElementsByTagName('video')[0];
    return video?.currentTime;
  };
  return scripting(videoCurrentTime);
};

export const getPlaybackStatus = () => {
  const playbackStatus = () => {
    const video = document.getElementsByTagName('video')[0];
    return video?.paused;
  };
  return scripting(playbackStatus);
};

console.log(getPlaybackStatus());
