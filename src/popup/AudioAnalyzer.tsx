import React, { FC, useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { audioDataState } from '../atom';
import ZundamonModel from './ZundamonModel';
import { emotionType } from '../types';

const AudioAnalyzer = () => {
  // const [isMouseOpen, setIsMouseOpen] = useState(false);
  // const [file, setFile] = useState<File | null>(null);
  const audioData = useRecoilValue(audioDataState);
  console.log('audioData', audioData);
  const emotionList: emotionType[] = [
    '通常',
    '少しネガティブ',
    'とてもネガティブ',
    '少しポジティブ',
    'とてもポジティブ',
  ];
  const [emotionType, setEmotionType] = useState<emotionType>('通常');
  // useEffect(() => {
  //   if (audioData) {
  //     const blob = new Blob([audioData.frequencyData], { type: 'application/octet-stream' });
  //     const tmpFile = new File([blob], 'example.bin');
  //     setFile(tmpFile);
  //   }
  //   playFile();
  // }, [file]);
  // const playFile = () => {
  //   if (!file) return;
  //   const audioContext = new (window.AudioContext || window.AudioContext)();
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     if (e.target) {
  //       const arrayBuffer = e.target.result as ArrayBuffer;
  //       audioContext.decodeAudioData(arrayBuffer, (buffer) => {
  //         const source = audioContext.createBufferSource();
  //         source.buffer = buffer;
  //         const analyser = audioContext.createAnalyser();
  //         analyser.fftSize = 2048;
  //         source.connect(analyser);
  //         analyser.connect(audioContext.destination);
  //         source.onended = () => {
  //           setIsMouseOpen(false);
  //           source.stop();
  //           source.disconnect();
  //           clearInterval(interval);
  //           audioContext.close();
  //         };
  //         const bufferLength = analyser.frequencyBinCount;
  //         const dataArray = new Uint8Array(bufferLength);
  //         source.start();
  //         const interval = setInterval(() => {
  //           analyser.getByteTimeDomainData(dataArray);
  //           let sum = 0;
  //           for (let i = 0; i < bufferLength; i++) {
  //             const value = (dataArray[i] - 128) / 128;
  //             sum += value * value;
  //           }
  //           const rms = Math.sqrt(sum / bufferLength);
  //           if (rms >= 0.001) {
  //             setIsMouseOpen(true);
  //           } else {
  //             setIsMouseOpen(false);
  //           }
  //         }, 500);
  //       });
  //     }
  //   };
  //   reader.readAsArrayBuffer(file);
  // };
  return (
    <>
      <button
        onClick={() => {
          let currentEmotionIndex = emotionList.findIndex((emotion) => emotion === emotionType);
          console.log('currentEmotionIndex', currentEmotionIndex);
          //　次の感情に変更
          currentEmotionIndex = (currentEmotionIndex + 1) % emotionList.length;
          // currentEmotionIndex == (currentEmotionIndex + 1) % emotionList.length;
          console.log('nextEmotionIndex', currentEmotionIndex, '/', emotionList.length);

          console.log('currentEmotion', emotionList[currentEmotionIndex]);
          setEmotionType(emotionList[currentEmotionIndex]);
        }}
      >
        change emotion
      </button>
      <ZundamonModel
        emotionType={emotionType}
        isMouseOpen={false}
        comment={audioData ? audioData.subtitle : ''}
      />
    </>
  );
};

export default AudioAnalyzer;
