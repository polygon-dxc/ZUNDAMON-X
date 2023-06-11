// getTranscript.ts
import axios from 'axios';

import { videoidtype } from '../types';

async function getTranscript({ videoId }: videoidtype) {
  //字幕APIアクセスURL
  //http://127.0.0.1:8000/transcript/?id=wdvclbIHfHk
  const response = await axios.get(`http://127.0.0.1:8000/transcript/`, {
    params: {
      id: videoId,
    },
  });

  // The data property of the response will contain the transcript
  const transcript = response.data;

  return transcript;
}

export default getTranscript;
