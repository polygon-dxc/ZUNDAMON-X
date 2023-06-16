// getTranscript.ts
import axios from 'axios';

import { videoidtype } from '../types';

export const getTranscript = () =>
  chrome.runtime.onMessage.addListener(async (request) => {
    console.log('メッセージを受け取ります', request);
    // 期待通りのリクエストかどうかをチェック
    if (request.name === 'getTranscript') {
      // async function getTranscript({ videoId }: videoidtype) {

      // const response = await axios.get(`http://0.0.0.0:8000/transcript?videoId=` + videoId, {
      //   headers: { 'Access-Control-Allow-Origin': '*' },
      //   withCredentials: true,
      // });

      //GCPアクセス字幕API.ver3
      await fetch(
        `https://asia-northeast1-zundamon-x.cloudfunctions.net/transcript-proxy?videoId=` +
          request.videoId,
        {
          method: 'GET',
          headers: { 'Access-Control-Allow-Origin': '*' },
          // withCredentials: true,
        }
      )
        .then((json) => {
          return json.json();
        })
        .then((res) => {
          const transcript = res;
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const id = tabs[0].id as number;

            // content_script へデータを送る
            chrome.tabs
              .sendMessage(id, {
                // content_script はタブごとに存在するため ID 指定する必要がある
                name: 'returnTranscript',
                data: {
                  transcript,
                },
              })
              .then((res) => {
                console.log('メッセージを送ります', res);
              })
              .catch((err) => {
                console.log('Error:', err);
              });
          });
        });

      // The data property of the response will contain the transcript

      // }
    }
  });

// export default getTranscript;
