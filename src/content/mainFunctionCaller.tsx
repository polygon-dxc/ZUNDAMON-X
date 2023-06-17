import { useEffect, useState } from 'react';
import { useGetVideoStatus } from './useGetVideoStatus';
import useGetVideoId from '../background/useGetVideoId';
import { useGetTranscript } from './useGetTranscript';
import { getTranscriptResponseType } from '../types';
import { useRecoilState } from 'recoil';
import { audioDataState } from '../atom';

// 何秒前から音声データを取得するか
const PRELOAD_SEC = 30;

const MainFunctionCaller = () => {
  const [wishList, setWishList] = useState<number[]>([]);
  const { currentTime } = useGetVideoStatus();
  const videoId = useGetVideoId();
  const transcript = useGetTranscript(videoId.videoId);
  const [createdAudioIndexArray, setCreatedAudioIndexArray] = useState<number[]>([]);
  const [audioData, setAudioData] = useRecoilState(audioDataState);

  const [currentTranscript, setCurrentTranscript] = useState<getTranscriptResponseType>();
  useEffect(() => {
    const val = transcript.findIndex(
      (item) =>
        currentTime && item.start <= currentTime && item.start + item.duration >= currentTime
    );

    if (val != -1) setCurrentTranscript(transcript[val]);
  }, [currentTime]);

  console.log(currentTranscript);

  const [audios, setAudios] = useState<{ [key in string]: HTMLAudioElement }>({});

  //currentTimeが変更する度に実行
  useEffect(() => {
    if (!transcript || !currentTime || !videoId.videoId) return;

    //ほしい物リストの範囲
    const upperLimitTime = currentTime + PRELOAD_SEC;
    const lowerLimitTime = currentTime - 15;
    //ほしい物リストの検索
    const tmpWishlist = transcript
      .map((item, index) =>
        item.start >= lowerLimitTime && item.start <= upperLimitTime ? index : -1
      )
      .filter((index) => index !== -1);

    setWishList(tmpWishlist); //ほしい物リストの更新
  }, [currentTime]);

  // 指定された音声を事前に生成
  useEffect(() => {
    const generate = async () => {
      for (let index of wishList.filter((index) => !createdAudioIndexArray.includes(index))) {
        const targetTranscript = transcript[index];
        if (!targetTranscript) return;
        if (audios[targetTranscript.text]) return;

        console.log('create audio', targetTranscript.text);
        const audio = new Audio();
        audio.src =
          'https://asia-northeast1-zundamon-x.cloudfunctions.net/zundamon-api-proxy/voice?message=' +
          targetTranscript.text;
        audio.onload = () => {
          console.log('audio loaded', targetTranscript.text);
        };
        audio.onerror = () => {
          console.log('audio error', targetTranscript.text);
          setCreatedAudioIndexArray((createdAudioIndexArray) =>
            createdAudioIndexArray.filter((item) => item !== index)
          );
        };
        setAudios((audios) => ({ ...audios, [targetTranscript.text]: audio }));
        setCreatedAudioIndexArray((createdAudioIndexArray) => [...createdAudioIndexArray, index]);

        // サーバーにリクエストを送る順番を保証するために少し待ちを入れる
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    };

    generate();
  }, [wishList]);

  useEffect(() => {
    if (!currentTranscript) return;

    const audio = audios[currentTranscript.text];
    console.log(audio);
    if (!audio) return;

    const { duration } = audio;
    const rate = duration / currentTranscript.duration;
    console.log({ voice: duration, video: currentTranscript.duration });
    console.log('rate: ', rate);
    console.log('state : ', audio.readyState);
    audio.playbackRate = rate >= 1 ? rate : 1;
    audio.play();

    setAudioData(audio);
  }, [currentTranscript?.start]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <p>current time : {currentTime}</p>
      <p>current transcript : {currentTranscript?.text}</p>
      <p>current transcript start: {currentTranscript?.start}</p>
    </div>
  );
};

export default MainFunctionCaller;
