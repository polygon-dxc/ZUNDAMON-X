import React, { useEffect, useState } from 'react';
import { set } from 'lodash';
import getTranscript from '../background/getTranscript';
import { getPlaybackStatus, getVideoCurrentTime } from '../background/getVideoCurrentTime';
import useGetVideoId from '../background/useGetVideoId';
import { getTranscriptResponseType, videoidtype } from '../types';
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
  const [TSdisplay, setTSdisplay] = useState<getTranscriptResponseType[]>([]);
  const { audioData, getAudio } = useAudioData();
  const [createdAudioIndex, setCreatedAudioIndex] = useState<number[]>([]);
  const [wishList, setWishList] = useState<number[]>([]);

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

      //ほしい物リストの範囲
      const upperLimitTime = currentTime + 20;
      const lowerLimitTime = currentTime - 15;
      //ほしい物リストの検索
      const tmpWishlist = transcript
        .map((item, index) =>
          item.start >= lowerLimitTime && item.start <= upperLimitTime ? index : -1
        )
        .filter((index) => index !== -1);

      setWishList(tmpWishlist); //ほしい物リストの更新
    }
  }, [currentTime]);

  //音声データの新規生成と削除------------------------------------------
  useEffect(() => {
    console.log('ほしい物リスト', wishList);

    let tmpCreatedList = [...createdAudioIndex];
    let tmpTSdisplay: getTranscriptResponseType[] = [];

    wishList.forEach((item) => {
      const findText = transcript[item];

      if (findText) {
        if (!createdAudioIndex.find((_) => _ == findText.start)) {
          console.log('作る', findText.text);
          // let _createdAudioIndex = [...createdAudioIndex];
          // _createdAudioIndex.push(findText.start);
          setCreatedAudioIndex((createdAudioIndex) => {
            let _createdAudioIndex = [...createdAudioIndex];

            _createdAudioIndex.push(findText.start);
            return _createdAudioIndex;
          });
        } else {
          tmpCreatedList = tmpCreatedList.filter((_) => _ !== findText.start);
        }
        tmpTSdisplay.push(findText);
      }
      return;
    });
    console.log('消す', tmpCreatedList);
    //消す　(tmpCreatedList])
    setCreatedAudioIndex((_) => {
      let _createdAudioIndex = [..._];
      _createdAudioIndex = _createdAudioIndex.filter((_) => !tmpCreatedList.includes(_));
      return _createdAudioIndex;
    }); //作成済みの音声データの更新
    setTSdisplay(tmpTSdisplay); //読み込み予定の字幕を更新
  }, [wishList[0]]);

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
        <p>Count：</p>
        <p>VideoID：{video.videoId ? video.videoId : ''}</p>
        <p>現在時刻-20：{(currentTime - 20).toFixed(3)}</p>
        <p>現在時刻：{currentTime.toFixed(3)}</p>
        <p>現在時刻+20：{(currentTime + 20).toFixed(3)}</p>
        <p>再生状況：{playbackStatus ? '停止中' : '再生中'}</p>
        <p>----------------------------------------</p>
        <h1>NOW!字幕</h1>
        <Metric>
          {currentTranscript.text ? currentTranscript.text : 'これはLIVE映像ですね！！'}
        </Metric>

        <p>字幕取得時間範囲</p>
        <div className="text-base ">
          <p>
            {TSdisplay
              ? TSdisplay.map((item) => (
                  <p>
                    {item.start}：{item.text}
                  </p>
                ))
              : ''}
          </p>
        </div>

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
