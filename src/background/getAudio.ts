const REQUEST_NAME = 'getAudio';

export const getAudio = () => {
  chrome.runtime.onMessage.addListener((request) => {
    if (request.name === REQUEST_NAME) {
      fetch(
        'https://asia-northeast1-zundamon-x.cloudfunctions.net/zundamon-api-proxy/voice?message=' +
          request.subtitle
      ).then((res) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const id = tabs[0].id as number;

          chrome.tabs.sendMessage(id, {
            name: 'returnAudio',
            data: {
              audio: res,
              subtitle: request.subtitle,
            },
          });
        });
      });
    }
  });
};
