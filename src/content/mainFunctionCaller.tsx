import React, { useEffect, useState } from 'react';
import { set } from 'lodash';
import getTranscript from '../background/getTranscript';
import { getPlaybackStatus, getVideoCurrentTime } from '../background/getVideoCurrentTime';
import useGetVideoId from '../background/useGetVideoId';
import { currentTimeType, getTranscriptResponseType, videoidtype } from '../types';
import { Card, Metric } from '@tremor/react';
import useAudioData from './useAudioData';
import AudioAnalyzer from '../popup/AudioAnalyzer';

//Youtube再生画面を開いたら実行されます

const MainFunctionCaller = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackStatus, setPlaybackStatus] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<getTranscriptResponseType[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<getTranscriptResponseType>({
    text: '再生開始！',
    start: 0,
    duration: 0,
  });
  const [currentAudioFile, setCurrentAudioFile] = useState<File | null>(null);
  const [getrangeTS, setGetrangeTS] = useState<getTranscriptResponseType[]>([]);
  const { audioData, getAudio } = useAudioData();
  const [createdAudioIndex, setCreatedAudioIndex] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0);

  const getAudioTime = 1000; //音声データの取得間隔

  //VideoIDを取得
  //videoIdのオブジェクト生成
  const video: videoidtype = useGetVideoId();

  //videoIdが変更する度に実行
  useEffect(() => {
    //contentにアクセスする度に最初に実行
    if (video.videoId !== '') {
      //字幕データを取得
      getTranscript(video).then((result) => {
        setTranscript(result);
      });

      const unsubscribe = setInterval(() => {
        //contentアクセス後、毎秒実行
        //現在の再生時刻を取得
        getVideoCurrentTime().then((result) => {
          if (typeof result === 'number') {
            setCurrentTime(result);
          } else {
            console.log('再生時刻取得error');
          }
          //現在の再生状態を取得
          getPlaybackStatus().then((result) => {
            if (typeof result === 'boolean') {
              setPlaybackStatus(result);
            } else {
              console.log('再生状態取得error');
            }
          });
        });
      }, getAudioTime);
      return () => {
        //タイマーを消す
        clearInterval(unsubscribe);
      };
    }
  }, [video.videoId]);

  //currentTimeが変更する度に実行
  useEffect(() => {
    //currentTimeとtranscriptが取得できた場合のみ実行
    if (currentTime && transcript) {
      //現在の再生時刻と連動した字幕の表示処理---------------------------------------
      const nowtranscript = transcript.find((item) => Math.abs(currentTime - item.start) <= 0.5);
      if (nowtranscript) {
        setCurrentTranscript(nowtranscript); //現在の字幕をセット
      } else {
        //console.log('近くに字幕がない！');
      }

      //--音声の事前生成処理------------------------------------------------------
      //音声生成範囲の閾値
      const upperLimitTime = currentTime + 20;
      const lowerLimitTime = currentTime - 20;
      const timeRangeIndices = transcript
        .map((item, index) =>
          item.start >= lowerLimitTime && item.start <= upperLimitTime ? index : -1
        )
        .filter((index) => index !== -1);
      const rangeData: getTranscriptResponseType[] = timeRangeIndices.map((item) => {
        //重複生成を防ぐ分岐１
        if (transcript[item].start in audioData) {
          // console.log("getAudio処理完了済");
        } else {
          //重複生成を防ぐ分岐２
          if (!createdAudioIndex.includes(transcript[item].start)) {
            //音声データ1回目の生成
            setCount(count + 1);
            setCreatedAudioIndex([...createdAudioIndex, transcript[item].start]); //生成済みstartを記録
            console.log(count, transcript[item].text); //console.log('音声データ生成');

            //getAudio(transcript[item].text, transcript[item].start);
          } else {
            //console.log('スルー');
          }
        }
        return {
          text: transcript[item].text,
          start: transcript[item].start,
          duration: transcript[item].duration,
        };
      });
      setGetrangeTS(rangeData); //range内のTranscriptをセット
    } else {
      console.log('字幕情報が取得できません');
    }
  }, [currentTime]);

  //音声の再生------------------------------------------
  const currentAudio = useAudioData();
  //今の時間に対応したstartがセットされた時に実行
  useEffect(() => {
    //startと一致するwavファイルをオブジェクトから取得
    const audioData = currentAudio.audioData[`${currentTranscript.start}`];
    setCurrentAudioFile(audioData); //wavファイルをセット

    //console.log('startTimeが変更されました:', currentTranscript.start);
  }, [currentTranscript.start]);

  const handleFileChange = (e: any) => {
    setCurrentAudioFile(e.target.files[0]);
  };

  return (
    <div style={{ color: 'white' }}>
      <Card>
        <p>Count：{count}</p>
        <p>VideoID：{video.videoId ? video.videoId : ''}</p>
        <p>現在時刻-20：{(currentTime - 20).toFixed(3)}</p>
        <p>現在時刻：{currentTime.toFixed(3)}</p>
        <p>現在時刻+20：{(currentTime + 20).toFixed(3)}</p>
        <p>字幕取得時間範囲</p>
        <div className="text-base ">
          <p>
            {getrangeTS.map((item, index) => (
              <p key={index}>
                {item.start}：{item.text}
              </p>
            ))}
          </p>
        </div>

        <p>再生状況：{playbackStatus ? '停止中' : '再生中'}</p>
        <h1>NOW!字幕</h1>

        <Metric>
          {currentTranscript.text ? currentTranscript.text : 'これはLIVE映像ですね！！'}
        </Metric>

        <p>----------------------------------------</p>
        <h1>ALL字幕</h1>
        <p>
          {transcript
            ? transcript.map((item, index) => <p key={index}>{item.text}</p>)
            : '字幕情報が取得できません'}
        </p>
        <input type="file" onChange={handleFileChange} />
        <div>
          {audioData ? <AudioAnalyzer file={audioData[1]} /> : <p>No audio file selected</p>}
        </div>
      </Card>
    </div>
  );
};

export default MainFunctionCaller;
