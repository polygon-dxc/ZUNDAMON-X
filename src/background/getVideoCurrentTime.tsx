/* 現在の再生時刻を取得 */
const getVideoCurrentTime = () => {
  const onRun = () => {
    const video = document.getElementsByTagName('video')[0];
    console.log(video);
    return video?.currentTime;
  };

  /* アクティブなタブを取得し、そのタブに対してスクリプトを実行する */
  const scripting = async () => {
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

  scripting();
};

export default getVideoCurrentTime;
