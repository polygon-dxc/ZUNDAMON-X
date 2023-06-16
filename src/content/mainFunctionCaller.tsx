import { useEffect, useState } from 'react';
import { useGetVideoStatus } from './useGetVideoStatus';
import useGetVideoId from '../background/useGetVideoId';
import { useGetTranscript } from './useGetTranscript';
import { getTranscriptResponseType } from '../types';
import { useRecoilState } from 'recoil';
import { audioDataState } from '../atom';

// 何秒前から音声データを取得するか
const PRELOAD_SEC = 60;

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

    if (val != -1) setCurrentTranscript(transcript[val + 1]);
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
    wishList
      .filter((index) => !createdAudioIndexArray.includes(index))
      .forEach((index) => {
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
        setAudios((audios) => ({ ...audios, [targetTranscript.text]: audio }));
        setCreatedAudioIndexArray((createdAudioIndexArray) => [...createdAudioIndexArray, index]);
      });
  }, [wishList]);

  useEffect(() => {
    if (!currentTranscript) return;

    const audio = audios[currentTranscript.text];
    console.log(audio);
    if (!audio) return;

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
