// backendのgetAudioを呼び出す
export const getAudio = (subtitle: string) => {
  console.log(`creating audio... : ${subtitle}`);
  // return new Promise(() => {});

  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ name: 'getAudio', subtitle: subtitle });
    chrome.runtime.onMessage.addListener((request) => {
      console.log(request);
      if (request.name === 'returnAudio' && request.data.subtitle === subtitle) {
        console.log(`finish! : ${subtitle}`);
        resolve(request.data.audio);
      }
    });
  });
};
