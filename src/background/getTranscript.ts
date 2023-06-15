// getTranscript.ts
import axios from 'axios';

import { videoidtype } from '../types';

async function getTranscript({ videoId }: videoidtype) {
  //字幕APIアクセスURL
  //http://127.0.0.1:8000/transcript/?id=wdvclbIHfHk

  /*
      //GCPアクセス字幕API.ver3
      const response = await axios.get(
      `https://asia-northeast1-zundamon-x.cloudfunctions.net/transcript-proxy?videoId=` + videoId,
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
        withCredentials: true,
      }
    );
 */

  try {
    const response = await axios.get(`http://0.0.0.0:8000/transcript?videoId=` + videoId, {
      headers: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true,
    });

    // The data property of the response will contain the transcript
    const transcript = response.data;
    return transcript;
  } catch (error) {
    console.error(error);
  }
}

export default getTranscript;
