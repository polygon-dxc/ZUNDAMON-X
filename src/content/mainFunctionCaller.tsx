import React, { useEffect, useState } from 'react';

import getTranscript from '../background/getTranscript';
import { getPlaybackStatus, getVideoCurrentTime } from '../background/getVideoCurrentTime';
import useGetVideoId from '../background/useGetVideoId';
import { currentTimeType, getTranscriptResponseType, videoidtype } from '../types';

//Youtube再生画面を開いたらこのページ内の動作は自動で実行されます

const MainFunctionCaller = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackStatus, setPlaybackStatus] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<getTranscriptResponseType[]>([]);

  //VideoIDを取得
  //videoIdのオブジェクト生成
  const videoId: videoidtype = useGetVideoId();

  useEffect(() => {
    //contentにアクセスする度に最初に実行
    if (videoId.videoId !== '') {
      //字幕データを取得
      getTranscript(videoId).then((result) => {
        setTranscript(result);
      });
      console.log(transcript);

      const unsubscribe = setInterval(() => {
        //contentアクセス後、毎秒実行
        getVideoCurrentTime().then((result) => {
          if (typeof result === 'number') {
            setCurrentTime(result);
            console.log(result);
          } else {
            console.log('error');
          }
          getPlaybackStatus().then((result) => {
            if (typeof result === 'boolean') {
              setPlaybackStatus(result);
              console.log(result);
            } else {
              console.log('error');
            }
            //ここに追加
          });
        });
      }, 1000);
      return () => {
        //タイマーを消す
        clearInterval(unsubscribe);
      };
    }
  }, [videoId.videoId]);

  return (
    <div>
      <p>現在時刻：{currentTime}</p>
      <p>再生状況：{playbackStatus ? '停止中' : '再生中'}</p>
      <p>
        字幕：
        {transcript
          ? transcript.map((item, index) => <p key={index}>{item.text}</p>)
          : '字幕情報が取得できません'}
      </p>
    </div>
  );
};

//getVideoCurrentTime() を実行してcurrentTimeに格納

//URLから動画IDを取得し字幕データの配列を獲得

/*
(transcript.find(() => {

})
*/

//字幕の配列のうち最初の５つを音声生成に突っ込む

//再生時間の監視
//配列の機能 lis

/*
while (currentTime - start < 1) {

}
*/

export default MainFunctionCaller;
