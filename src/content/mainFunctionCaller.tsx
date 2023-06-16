import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { audioDataState } from '../atom';
import { useGetVideoStatus } from './useGetVideoStatus';
import useGetVideoId from '../background/useGetVideoId';
import { useGetTranscript } from './useGetTranscript';
import { getAudio } from './getAudio';

// 何秒前から音声データを取得するか
const PRELOAD_SEC = 10;

const MainFunctionCaller = () => {
  const [wishList, setWishList] = useState<number[]>([]);
  const [allAudioData, setAllAudioData] = useRecoilState(audioDataState);
  const { currentTime } = useGetVideoStatus();
  const videoId = useGetVideoId();
  const transcript = useGetTranscript(videoId);
  const [createdAudioIndexArray, setCreatedAudioIndexArray] = useState<number[]>([]);

  const currentTranscript = transcript.find(
    (item) => currentTime && item.start <= currentTime && item.start + item.duration >= currentTime
  );
  const currentAudioFile = currentTranscript && allAudioData[currentTranscript.start];

  //currentTimeが変更する度に実行
  useEffect(() => {
    if (!transcript || !currentTime) return;

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

    // 現在時間から-5分の音声データを削除する
    const fiveMinutesAgo = currentTime - 300;
    const updatedAudioData = { ...allAudioData };
    Object.keys(updatedAudioData).forEach((start) => {
      if (Number(start) <= fiveMinutesAgo) {
        delete updatedAudioData[start];
      }
    });
    setAllAudioData(updatedAudioData);
    setCreatedAudioIndexArray((indexArray) =>
      indexArray.filter((index) => !Object.keys(updatedAudioData).includes(index.toString()))
    );
  }, [currentTime]);

  // 指定された音声を事前に生成
  useEffect(() => {
    wishList
      .filter((index) => !createdAudioIndexArray.includes(index))
      .forEach((index) => {
        const targetTranscript = transcript[index];
        if (!targetTranscript) return;

        setCreatedAudioIndexArray((createdAudioIndexArray) => [...createdAudioIndexArray, index]);
        getAudio(targetTranscript.text).then((audioData) => {
          setAllAudioData((allAudioData) => ({
            ...allAudioData,
            [targetTranscript.start]: audioData,
          }));
        });
      });
  }, [wishList]);

  // 音声を再生
  useEffect(() => {
    if (!currentAudioFile) return;

    const url = URL.createObjectURL(currentAudioFile);
    const audio = new Audio(url);
    audio.onload = () => {
      audio.play();
    };
  }, [currentAudioFile]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <p>current time : {currentTime}</p>
      <p>current transcript : {currentTranscript?.text}</p>
    </div>
  );
};

export default MainFunctionCaller;
